import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { EmptyBagState } from '../components/checkout/EmptyBagState';
import { AuthRequiredState } from '../components/checkout/AuthRequiredState';
import { CheckoutForm } from '../components/checkout/CheckoutForm';

export const Checkout = () => {
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const createBackendOrder = useStore((state) => state.createBackendOrder);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = cartTotal > 250 ? 0 : 20;
  const grandTotal = cartTotal + shippingFee;

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Client authentication required. Please sign in or register before confirming your acquisition.');
      navigate('/login?redirect=/checkout');
      return;
    }

    if (cart.length === 0) {
      setError('Your shopping bag is empty.');
      return;
    }

    if (!formData.address.trim() || !formData.city.trim() || !formData.postalCode.trim()) {
      setError('Please provide complete shipping destination coordinates.');
      return;
    }

    setLoading(true);
    const res = await createBackendOrder({
      orderItems: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        product: item._id || item.id || null,
      })),
      shippingAddress: formData,
      paymentMethod: 'Cash on Delivery (COD)',
      totalPrice: grandTotal,
      shippingPrice: shippingFee,
    });
    setLoading(false);

    if (res?.success) {
      clearCart();
      navigate('/success');
    } else {
      setError(res?.message || 'Order could not be transmitted because the backend server is offline.');
    }
  };

  // State 1: Bag is Empty
  if (cart.length === 0) {
    return <EmptyBagState />;
  }

  // State 2: Unauthenticated Client
  if (!user) {
    return <AuthRequiredState cart={cart} grandTotal={grandTotal} />;
  }

  // State 3: Authenticated Checkout Form
  return (
    <CheckoutForm
      user={user}
      formData={formData}
      onChange={handleFieldChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      cart={cart}
      grandTotal={grandTotal}
      shippingFee={shippingFee}
    />
  );
};

export default Checkout;
