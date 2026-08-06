import React, { useEffect, useState } from 'react';
import DashboardPasswordModal, { getAuthCookie } from './dashboardPasswordModal';

const LOCKED_CLASS = 'roca-gate-locked';

const _mountEl = document.getElementById('product-password-gate');
const EXPECTED_HASH = _mountEl?.dataset?.pwHash || '';
const COOKIE_NAME = _mountEl?.dataset?.cookieName || 'roca_sifter_copy_auth';

const ProductPasswordGate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const cookie = getAuthCookie(COOKIE_NAME);
    return Boolean(cookie && EXPECTED_HASH && cookie === EXPECTED_HASH);
  });

  useEffect(() => {
    if (isAuthenticated) document.documentElement.classList.remove(LOCKED_CLASS);
  }, [isAuthenticated]);

  const handleSuccess = () => setIsAuthenticated(true);

  if (isAuthenticated) return null;

  return (
    <DashboardPasswordModal
      isOpen={true}
      expectedHash={EXPECTED_HASH}
      onSuccess={handleSuccess}
      cookieName={COOKIE_NAME}
      title="Restricted Page"
      description="Enter the password to view this page."
    />
  );
};

export default ProductPasswordGate;
