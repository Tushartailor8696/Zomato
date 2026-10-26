import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // लोकल स्टोरेज से टोकन चेक करें
  const token = localStorage.getItem('token');

  // अगर टोकन नहीं है, तो यूजर को लॉगिन पेज पर भेज दें
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // अगर टोकन है, तो कॉम्पोनेंट (जैसे Dashboard) दिखने दें
  return children;
}