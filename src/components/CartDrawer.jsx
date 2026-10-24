import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getImageUrl, handleImageError } from '../lib/utils';
import { useScrollLock } from '../hooks/useScrollLock';

export const CartDrawer = ({ isOpen, onClose }) => {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const navigate = useNavigate();

  // Freeze background page scrollbar when cart drawer is active
  useScrollLock(isOpen);

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#111] border-l border-neutral-800 text-white flex flex-col shadow-2xl">
          
          <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="font-serif text-lg tracking-wider">Shopping Bag ({totalItems})</h2>
            </div>
            <button onClick={onClose} className="text-neutral-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-24 space-y-4">
                <ShoppingBag className="w-16 h-16 mx-auto text-neutral-700 stroke-1" />
                <p className="text-neutral-400 font-serif text-base">Your shopping bag is empty.</p>
                <button 
                  onClick={() => { onClose(); navigate('/shop'); }}
                  className="px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId} className="flex space-x-4 pb-6 border-b border-neutral-800 items-center">
                  <img src={getImageUrl(item.image)} alt={item.name} loading="lazy" decoding="async" onError={handleImageError} className="w-20 h-24 object-cover rounded-lg bg-neutral-900" />
                  <div className="flex-1 space-y-1">
                    <h4 className="font-serif text-sm font-medium line-clamp-1">{item.name}</h4>
                    <p className="text-[11px] text-neutral-400">Size: {item.selectedSize}</p>
                    <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-800 rounded-md">
                        <button onClick={() => updateQuantity(item.cartId, -1)} className="p-1 text-neutral-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                        <span className="px-3 text-xs font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartId, 1)} className="p-1 text-neutral-400 hover:text-white"><Plus className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="text-neutral-500 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-neutral-800 bg-[#0c0c0c] space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Express Shipping</span>
                  <span>{total > 250 ? 'FREE' : '$20.00'}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-white pt-2 border-t border-neutral-800">
                  <span>Total</span>
                  <span>${(total + (total > 250 ? 0 : 20)).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => { onClose(); navigate('/checkout'); }}
                className="w-full py-4 bg-white text-black rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-neutral-200 transition-all shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {!user && (
                <p className="text-[10px] text-neutral-400 text-center tracking-widest uppercase">
                  Client sign-in required to place order
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
