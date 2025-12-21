import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  Code,
  MessageSquare,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save
} from 'lucide-react';
import ProjectsManager from './components/ProjectsManager';
import SkillsManager from './components/SkillsManager';
import TestimonialsManager from './components/TestimonialsManager';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'projects', name: 'Projects', icon: Briefcase },
    { id: 'skills', name: 'Skills', icon: Code },
    { id: 'testimonials', name: 'Testimonials', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">SimZik Admin</h1>
              <p className="text-sm text-gray-600">Portfolio Management System</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && <OverviewSection />}
              {activeTab === 'projects' && <ProjectsManager />}
              {activeTab === 'skills' && <SkillsManager />}
              {activeTab === 'testimonials' && <TestimonialsManager />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Section Component
const OverviewSection = () => {
  const stats = [
    { label: 'Total Projects', value: '9', color: 'bg-blue-500' },
    { label: 'Skills', value: '8', color: 'bg-green-500' },
    { label: 'Testimonials', value: '3', color: 'bg-purple-500' },
    { label: 'Years Experience', value: '2+', color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-dark mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-white text-2xl font-bold">{stat.value.charAt(0)}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-dark">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-dark mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors">
            <Plus size={20} className="text-primary" />
            <span className="font-medium text-gray-700">Add New Project</span>
          </button>
          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors">
            <Plus size={20} className="text-primary" />
            <span className="font-medium text-gray-700">Add New Skill</span>
          </button>
          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors">
            <Plus size={20} className="text-primary" />
            <span className="font-medium text-gray-700">Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-dark mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-gray-700 font-medium">Project "YACSN" was updated</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-gray-700 font-medium">New skill "React.js" added</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-gray-700 font-medium">Testimonial from client received</p>
              <p className="text-sm text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
