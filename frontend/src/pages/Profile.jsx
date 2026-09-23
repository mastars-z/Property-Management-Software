import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import ProtectedRoute from '../routes/ProtectedRoute';
import { User, Mail, Phone, Shield, Camera, Save, AlertCircle } from 'lucide-react';

export default function Profile() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);
        
        // Skeleton for future API integration
        setTimeout(() => {
            setIsSaving(false);
            setMessage({ type: 'success', text: 'Profile updated successfully.' });
        }, 1000);
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Profile & Settings</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage your account settings and personal information.
                        </p>
                    </div>

                    <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-8 border-b border-slate-200 flex items-center space-x-6">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <button className="absolute bottom-0 right-0 h-8 w-8 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-600 shadow-sm transition-colors">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">{user?.name}</h2>
                                <div className="flex items-center mt-1 text-sm text-slate-500 capitalize">
                                    <Shield size={14} className="mr-1.5 text-blue-500" />
                                    {user?.role?.replace('_', ' ')} Account
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {message && (
                                <div className={`p-4 rounded-lg flex items-center text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                    <AlertCircle size={16} className="mr-2" />
                                    {message.text}
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 sm:text-sm outline-none transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 sm:text-sm outline-none transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+251..."
                                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 sm:text-sm outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">System Role</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Shield size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={user?.role?.replace('_', ' ')}
                                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 sm:text-sm cursor-not-allowed capitalize"
                                            disabled
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-slate-500">Roles cannot be changed by users.</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-200 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex items-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 transition-colors"
                                >
                                    <Save size={18} className="mr-2" />
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}