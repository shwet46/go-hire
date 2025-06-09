'use client';
import { createContext, useContext} from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Application {
  id: string;
  jobId: string;
  status: string;
}

interface Referral {
  id: string;
  jobId: string;
  status: string;
}

interface UserState {
  points: number;
  rank: number;
  tasks: Task[];
  applications: Application[];
  referrals: Referral[];
}

interface UserContextType {
  state: UserState;
  updatePoints: (points: number) => void;
  addTask: (task: Task) => void;
  updateRank: (rank: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within UserProvider');
  }
  return context;
};