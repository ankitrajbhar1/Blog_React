import conf from '../config/conf';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    // Create a new account and log in immediately
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            }
        } catch (error) {
            if (error.code === 409) {
                console.log("Appwrite service :: createAccount :: error - User already exists", error);
                throw new Error('A user with the same email or ID already exists. Please log in instead.');
            } else {
                console.log("Appwrite service :: createAccount :: error", error);
                throw new Error('An unexpected error occurred. Please try again later.');
            }
        }
    }
    

    // Log in with email and password
    async login({email, password}) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            if (error.code === 401) {
                console.log("Appwrite service :: login :: error - Invalid credentials", error);
                throw new Error('Invalid email or password. Please try again.');
            } else {
                console.log("Appwrite service :: login :: error", error);
                throw new Error('An unexpected error occurred during login. Please try again later.');
            }
        }
    }

    // Get current authenticated user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }
    

    // Log out the current user
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error.message || error);
            throw error;  // Optional: Propagate the error if needed
        }
    }
}

const authService = new AuthService();
export default authService;
