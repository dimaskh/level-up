import { screen } from '@testing-library/react';
import { TaskCard } from '../task-card';
import { renderWithRouter } from '../../test/utils';

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  type: 'daily',
  difficulty: 'novice',
  status: 'available',
  rewards: {
    xp: 100,
    gold: 50,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('TaskCard', () => {
  it('renders task information correctly', () => {
    renderWithRouter(<TaskCard task={mockTask} />);
    
    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    expect(screen.getByText(mockTask.difficulty, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${mockTask.rewards.xp} XP`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${mockTask.rewards.gold} Gold`, { exact: false })).toBeInTheDocument();
  });

  it('displays the correct difficulty badge', () => {
    renderWithRouter(<TaskCard task={mockTask} />);
    const difficultyBadge = screen.getByText(mockTask.difficulty, { exact: false });
    expect(difficultyBadge).toHaveClass('bg-green-100'); // Assuming novice difficulty has green styling
  });

  it('displays the correct task type', () => {
    renderWithRouter(<TaskCard task={mockTask} />);
    expect(screen.getByText(mockTask.type, { exact: false })).toBeInTheDocument();
  });
});
