import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // 1. All users state (persisted in localStorage or default to INITIAL_USERS)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('fer_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // 2. Current logged in user (default to Buyer for convenient testing or null for Guest)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('fer_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[2]; // Default to Buyer (Nguyễn Văn Mua)
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('fer_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fer_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fer_current_user');
    }
  }, [currentUser]);

  // Helpers
  const isAuthenticated = Boolean(currentUser);
  const currentRole = currentUser ? currentUser.role : 'guest';

  // Login
  const login = (email, password) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
      return { success: false, message: 'Email không tồn tại trong hệ thống!' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Mật khẩu không chính xác!' };
    }

    if (user.status === 'banned') {
      return { success: false, message: 'Tài khoản của bạn đã bị Quản trị viên khóa do vi phạm chính sách!' };
    }

    setCurrentUser(user);
    return { success: true, user };
  };

  // Register
  const register = ({ name, email, password, phone, role = 'buyer' }) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      return { success: false, message: 'Email này đã được đăng ký tài khoản!' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
      phone: phone || 'Chưa cập nhật',
      address: 'Chưa cập nhật',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      status: 'active',
      walletBalance: 1000.00,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
  };

  // Update profile
  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
  };

  // Fast Switch Role Demo Helper
  const switchRoleDemo = (role) => {
    if (role === 'guest') {
      setCurrentUser(null);
      return;
    }
    const targetUser = users.find((u) => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
    }
  };

  // Admin: Toggle Ban / Unban
  const toggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'active' ? 'banned' : 'active';
          if (currentUser && currentUser.id === userId && newStatus === 'banned') {
            setCurrentUser(null); // Force logout if current user is banned
          }
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  // Admin: Change User Role
  const changeUserRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = { ...u, role: newRole };
          if (currentUser && currentUser.id === userId) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return u;
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated,
        users,
        login,
        register,
        logout,
        updateProfile,
        switchRoleDemo,
        toggleUserStatus,
        changeUserRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
