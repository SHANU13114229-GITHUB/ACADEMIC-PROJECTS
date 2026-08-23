import React from 'react';
import { Home, MessageSquare, IdCard, Bell, User } from 'lucide-react';

export type BottomNavTab = 'home' | 'message' | 'idcard' | 'notice' | 'profile';

interface BottomNavProps {
  activeTab: BottomNavTab;
  onSelectTab: (tab: BottomNavTab) => void;
  unreadMessageCount: number;
  unreadNoticeCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadMessageCount,
  unreadNoticeCount
}) => {
  const navItems = [
    {
      id: 'home' as BottomNavTab,
      label: 'Home',
      icon: Home
    },
    {
      id: 'message' as BottomNavTab,
      label: 'Message',
      icon: MessageSquare,
      badge: unreadMessageCount
    },
    {
      id: 'idcard' as BottomNavTab,
      label: 'Id Card',
      icon: IdCard
    },
    {
      id: 'notice' as BottomNavTab,
      label: 'Notice',
      icon: Bell,
      badge: unreadNoticeCount
    },
    {
      id: 'profile' as BottomNavTab,
      label: 'Profile',
      icon: User
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FCFAF7] border-t border-[#E8E4E1] shadow-md z-40 max-w-md mx-auto">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center relative transition-all duration-200 ${
                isActive
                  ? 'text-[#435585] font-bold'
                  : 'text-[#8C8885] hover:text-[#2D2926] font-medium'
              }`}
            >
              {/* Active indicator top line */}
              {isActive && (
                <span className="absolute top-0 left-1/4 right-1/4 h-1 bg-[#435585] rounded-b-full"></span>
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 bg-[#435585] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full min-w-[14px] text-center border border-[#FCFAF7]">
                    {item.badge}
                  </span>
                ) : null}
              </div>

              <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
