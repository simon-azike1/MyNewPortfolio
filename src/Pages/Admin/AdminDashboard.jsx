import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  Code,
  MessageSquare,
  LogOut,
  Plus,
  Sun,
  Moon
} from 'lucide-react';
import ProjectsManager from './components/ProjectsManager';
import SkillsManager from './components/SkillsManager';
import TestimonialsManager from './components/TestimonialsManager';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/logo.png';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [quickAction, setQuickAction] = useState({ tab: null, token: 0 });
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'projects', name: 'Projects', icon: Briefcase },
    { id: 'skills', name: 'Skills', icon: Code },
    { id: 'testimonials', name: 'Testimonials', icon: MessageSquare },
  ];

  const handleQuickAction = (tab) => {
    setQuickAction({ tab, token: Date.now() });
    setActiveTab(tab);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="min-h-screen bg-theme-bg-primary text-theme-text-primary">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-theme-card border-b border-theme">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <a href="/" className="flex items-center gap-3" aria-label="SimzikTech Home">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-theme-accent-primary to-theme-accent-secondary p-[2px] shadow-md transition-transform duration-300 hover:scale-105">
                  <span className="h-full w-full rounded-full bg-theme-bg-primary p-[2px]">
                    <img src={logo} alt="SimzikTech logo" className="h-full w-full rounded-full object-cover" />
                  </span>
                </span>
                <span className="brand-wordmark brand-wordmark-hover text-base font-medium italic text-theme-text-primary">
                  SimzikTech
                </span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-lg bg-theme-bg-secondary border border-theme flex items-center justify-center text-theme-text-primary"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-theme-text-secondary hover:bg-theme-bg-secondary rounded-lg transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-theme-card rounded-xl shadow-sm p-4 space-y-2 border border-theme">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-theme-accent-primary text-white'
                        : 'text-theme-text-secondary hover:bg-theme-bg-secondary'
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
              {activeTab === 'overview' && <OverviewSection onQuickAction={handleQuickAction} />}
              {activeTab === 'projects' && <ProjectsManager quickAction={quickAction} />}
              {activeTab === 'skills' && <SkillsManager quickAction={quickAction} />}
              {activeTab === 'testimonials' && <TestimonialsManager quickAction={quickAction} />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Section Component
const OverviewSection = ({ onQuickAction }) => {
  const stats = [
    { label: 'Total Projects', value: '9', color: 'bg-primary-dark' },
    { label: 'Skills', value: '8', color: 'bg-primary' },
    { label: 'Testimonials', value: '3', color: 'bg-primary-light' },
    { label: 'Years Experience', value: '2+', color: 'bg-dark' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-theme-text-primary mb-2">Dashboard Overview</h2>
        <p className="text-theme-text-secondary">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-theme-card rounded-xl shadow-sm p-6 border border-theme"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-white text-2xl font-bold">{stat.value.charAt(0)}</span>
            </div>
            <p className="text-theme-text-secondary text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-theme-text-primary">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-theme-card rounded-xl shadow-sm p-6 border border-theme">
        <h3 className="text-xl font-bold text-theme-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onQuickAction('projects')}
            className="flex items-center gap-3 p-4 border-2 border-theme rounded-lg hover:border-theme-accent-primary hover:bg-theme-bg-secondary transition-colors"
          >
            <Plus size={20} className="text-theme-accent-primary" />
            <span className="font-medium text-theme-text-secondary">Add New Project</span>
          </button>
          <button
            onClick={() => onQuickAction('skills')}
            className="flex items-center gap-3 p-4 border-2 border-theme rounded-lg hover:border-theme-accent-primary hover:bg-theme-bg-secondary transition-colors"
          >
            <Plus size={20} className="text-theme-accent-primary" />
            <span className="font-medium text-theme-text-secondary">Add New Skill</span>
          </button>
          <button
            onClick={() => onQuickAction('testimonials')}
            className="flex items-center gap-3 p-4 border-2 border-theme rounded-lg hover:border-theme-accent-primary hover:bg-theme-bg-secondary transition-colors"
          >
            <Plus size={20} className="text-theme-accent-primary" />
            <span className="font-medium text-theme-text-secondary">Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-theme-card rounded-xl shadow-sm p-6 border border-theme">
        <h3 className="text-xl font-bold text-theme-text-primary mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b border-theme">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-theme-text-secondary font-medium">Project "YACSN" was updated</p>
              <p className="text-sm text-theme-text-tertiary">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-4 border-b border-theme">
            <div className="w-2 h-2 bg-primary-light rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-theme-text-secondary font-medium">New skill "React.js" added</p>
              <p className="text-sm text-theme-text-tertiary">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 bg-primary-dark rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-theme-text-secondary font-medium">Testimonial from client received</p>
              <p className="text-sm text-theme-text-tertiary">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
