import ApiServices from '@/services/ApiServices';
import { SessionHistoryData } from '@/store/useSessionHistory';

export const handleDeleteSession = async (sessionId: string) => {
  await ApiServices.handleSessionDelete(sessionId);
};

export function removeItemById(data: SessionHistoryData, idToRemove: string): SessionHistoryData {
  return data
    .map((group) => ({
      ...group,
      data: group.data.filter((item) => item.id !== idToRemove),
    }))
    .filter((group) => group.data.length > 0); // Remove empty groups
}
