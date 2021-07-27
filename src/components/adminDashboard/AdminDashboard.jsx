/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import axios========== */
import axios from 'axios';

/* ========= Import react modules ========== */
import React, { useState, useEffect } from 'react';

/* ========= Import react components ========== */

/* ========= Import util modules ========== */
import { getCookie } from '../../../utils/cookie.mjs';

/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */
export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>
        Welcome!
        {getCookie('userName')}
      </p>
    </div>
  );
}
