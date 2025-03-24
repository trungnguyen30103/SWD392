import React, { useState, useEffect } from 'react';
import './OrderDetails.scss';
import StatusBadge from '../StatusBadge';
import TimelineItem from '../TimelineItem';
import OrderNote from '../OrderNote';
import db from '../../../db/db.json';
import { mockOrderStatuses } from '../../../mock/orderData';

const OrderDetails = ({ order, onClose, onUpdateStatus }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [orderPayment, setOrderPayment] = useState(null);
  const [orderShipment, setOrderShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [activeTab, setActiveTab] = useState('items');
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const [tabTransitioning, setTabTransitioning] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = () => {
      try {
        // Get order details (items)
        const details = db.orderDetails.filter(item => item.order_id === order.id);
        
        const enrichedItems = details.map(item => {
          // Get product info
          let productInfo = null;
          if (item.product_id) {
            productInfo = db.products.find(p => p.id === item.product_id);
          } else if (item.blindbox_id) {
            productInfo = db.blindBoxes.find(b => b.id === item.blindbox_id);
          }
          
          return {
            ...item,
            name: productInfo ? productInfo.name : 'Unknown Product',
            image: productInfo ? productInfo.imageUrl : null,
            totalPrice: (item.price * item.quantity).toFixed(2)
          };
        });
        
        // Get payment info
        const payment = db.payments.find(p => p.order_id === order.id);
        
        // Get shipment info
        const shipment = db.shipments.find(s => s.order_id === order.id);
        
        // Mock notes
        const mockNotes = order.id % 2 === 0 ? [
          {
            id: 1,
            author: 'Admin User',
            date: new Date(new Date().getTime() - 86400000).toISOString(),
            content: 'Customer contacted about delivery options. Prefers morning delivery.'
          }
        ] : [];
        
        setOrderItems(enrichedItems);
        setOrderPayment(payment);
        setOrderShipment(shipment);
        setNotes(mockNotes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };
    
    // Simulate network delay for loading state demonstration
    const timer = setTimeout(() => {
      fetchOrderDetails();
    }, 600);
    
    return () => clearTimeout(timer);
  }, [order.id]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    onUpdateStatus(order.id, selectedStatus);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    
    setTabTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTabTransitioning(false);
    }, 200);
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;

    const newNote = {
      id: Date.now(),
      author: 'Admin User',
      date: new Date().toISOString(),
      content: noteText
    };

    setNotes([newNote, ...notes]);
    setNoteText('');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Mock timeline data - in a real app, this would come from the database
  const orderTimeline = [
    {
      status: 'created',
      date: order.created_at,
      description: 'Order was placed by customer'
    },
    {
      status: 'processing',
      date: order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 
        new Date(new Date(order.created_at).getTime() + 24*60*60*1000).toISOString() : null,
      description: 'Order confirmed and being processed'
    },
    {
      status: 'shipped',
      date: order.status === 'shipped' || order.status === 'delivered' ? 
        new Date(new Date(order.created_at).getTime() + 48*60*60*1000).toISOString() : null,
      description: 'Order has been shipped'
    },
    {
      status: 'delivered',
      date: order.status === 'delivered' ? 
        new Date(new Date(order.created_at).getTime() + 72*60*60*1000).toISOString() : null,
      description: 'Order was delivered'
    }
  ];

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      case 'processing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      case 'shipped':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        );
      case 'delivered':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'cancelled':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
    }
  };

  const getTabIcon = (tab) => {
    switch(tab) {
      case 'items':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          </svg>
        );
      case 'timeline':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      case 'notes':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="order-details-overlay">
      <div className="order-details-modal">
        <div className="modal-header">
          <div className="header-content">
            <h2>Order #{order.id}</h2>
            <span className="order-date">{formatDate(order.order_date)}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading order details...</p>
          </div>
        ) : (
          <>
            <div className="modal-body">
              <div className="order-summary-section">
                <div className="order-status-card">
                  <div className="status-icon">
                    {getStatusIcon(order.status)}
                  </div>
                  <div className="status-content">
                    <h3>Order Status</h3>
                    <StatusBadge status={order.status} />
                    <div className="status-update">
                      <select 
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        className="status-select"
                      >
                        {mockOrderStatuses.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                      <button 
                        className="update-btn"
                        disabled={selectedStatus === order.status} 
                        onClick={handleUpdateStatus}
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>

                <div className="order-cards">
                  <div className="info-card customer-card">
                    <div className="card-header">
                      <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Customer
                      </h3>
                    </div>
                    <div className="card-content">
                      <p className="customer-name">{order.customerName}</p>
                      <p className="customer-email">{order.customerEmail}</p>
                    </div>
                  </div>

                  <div className="info-card payment-card">
                    <div className="card-header">
                      <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                        Payment
                      </h3>
                    </div>
                    <div className="card-content">
                      <div className="detail-row">
                        <span className="detail-label">Method:</span>
                        <span className="detail-value">{orderPayment ? orderPayment.method : 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Status:</span>
                        <StatusBadge status={orderPayment ? orderPayment.status.toLowerCase() : 'pending'} />
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Transaction ID:</span>
                        <span className="detail-value">{orderPayment ? orderPayment.transaction_id : 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="info-card shipping-card">
                    <div className="card-header">
                      <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="3" width="15" height="13"></rect>
                          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                          <circle cx="5.5" cy="18.5" r="2.5"></circle>
                          <circle cx="18.5" cy="18.5" r="2.5"></circle>
                        </svg>
                        Shipping
                      </h3>
                    </div>
                    <div className="card-content">
                      <div className="detail-row">
                        <span className="detail-label">Method:</span>
                        <span className="detail-value">{orderShipment ? orderShipment.method : 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Status:</span>
                        <StatusBadge status={orderShipment ? orderShipment.status.toLowerCase() : 'not_shipped'} />
                      </div>
                      <div className="address-box">
                        <p>{orderShipment ? orderShipment.address : 'No address provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-detail-tabs">
                <div className="tab-header">
                  {['items', 'timeline', 'notes'].map(tab => (
                    <button 
                      key={tab}
                      className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => handleTabChange(tab)}
                    >
                      {getTabIcon(tab)}
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {tab === 'notes' && notes.length > 0 && (
                        <span className="tab-badge">{notes.length}</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className={`tab-content ${tabTransitioning ? 'transitioning' : ''}`}>
                  {activeTab === 'items' && (
                    <div className="items-tab">
                      <div className="items-table-container">
                        <table className="items-table">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderItems.map(item => (
                              <tr key={item.id}>
                                <td>
                                  <div className="product-info">
                                    {item.image && (
                                      <div className="product-image">
                                        <img src={item.image} alt={item.name} />
                                      </div>
                                    )}
                                    <span className="product-name">{item.name}</span>
                                  </div>
                                </td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>${item.totalPrice}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="order-summary">
                        <div className="summary-row">
                          <span>Subtotal</span>
                          <span>${order.total_amount.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                          <span>Shipping</span>
                          <span>$0.00</span>
                        </div>
                        <div className="summary-row">
                          <span>Tax</span>
                          <span>$0.00</span>
                        </div>
                        <div className="summary-row total">
                          <span>Total</span>
                          <span>${order.total_amount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'timeline' && (
                    <div className="timeline-tab">
                      <div className="timeline">
                        {orderTimeline.map((event, index) => (
                          <TimelineItem key={index} event={event} formatDate={formatDate} />
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'notes' && (
                    <div className="notes-tab">
                      <div className="notes-container">
                        {notes.length === 0 ? (
                          <p className="empty-notes">No notes have been added to this order yet.</p>
                        ) : (
                          notes.map(note => (
                            <OrderNote key={note.id} note={note} onDelete={handleDeleteNote} />
                          ))
                        )}
                        <div className="add-note">
                          <textarea 
                            placeholder="Add a note about this order..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                          ></textarea>
                          <button className="add-note-btn" onClick={handleAddNote}>Add Note</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <div className="footer-actions">
                <button className="btn-secondary" onClick={onClose}>
                  Close
                </button>
                <div className="right-actions">
                  <button className="btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Print Invoice
                  </button>
                  <button className="btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download Details
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
