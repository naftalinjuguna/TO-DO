export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Category = 'Development' | 'School' | 'Personal' | 'Finance' | 'Health' | 'Other';

export interface TodoModel {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  dueTime: string;
  priority: Priority;
  category: Category;
  completed: boolean;
}
