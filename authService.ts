
import bcrypt from 'bcryptjs';
import { User } from './types';

const USERS_KEY = 'axiom_users_db';
const SESSION_KEY = 'axiom_session';

/**
 * Robust mock backend for Axiom Audit.
 * Handles persistence via LocalStorage and security via bcrypt.
 */
export const authService = {
  /**
   * Fetch all registered users from the local store.
   */
  getUsers: (): any[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Register a new forensic account.
   */
  register: async (name: string, email: string, password: string, company: string): Promise<User> => {
    // 1. Validation
    if (!name || !email || !password) throw new Error("Missing required fields.");
    if (password.length < 6) throw new Error("Password must be at least 6 characters.");
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error("Invalid email format.");

    const users = authService.getUsers();
    
    // 2. Check for duplicate email
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }

    // 3. Hash password for security
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // 4. Create User Record
    const newUserRecord = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      company,
      createdAt: Date.now()
    };

    // 5. Store in "Database"
    users.push(newUserRecord);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Return User object without sensitive password
    const { password: _, ...userWithoutPassword } = newUserRecord;
    return userWithoutPassword as User;
  },

  /**
   * Authenticate an existing auditor.
   */
  login: async (email: string, password: string): Promise<User> => {
    const users = authService.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error("No account found with this email.");
    }

    // Compare hashed passwords
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password.");
    }

    // Establish session
    const { password: _, ...userSession } = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(userSession));

    return userSession as User;
  },

  /**
   * Terminate secure session.
   */
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  /**
   * Check if a valid session exists.
   */
  getCurrentUser: (): User | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }
};
