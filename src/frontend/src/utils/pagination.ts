import { SessionHistoryData } from '@/components/layout/Sidebar';

interface PaginationResponse {
  data: {
    data: SessionHistoryData;
  };
}

export enum ADD_FORM {
  TOP = 'top',
  BOTTOM = 'bottom',
}

type ADDFROM = `${ADD_FORM}`; // Literal union: "top" | "bottom"

export const handlePaginationData = (
  response: PaginationResponse,
  prev: SessionHistoryData,
  addFrom?: ADDFROM
) => {
  const latestByTimeline = new Map(
    response.data.data.map((group: any) => [group.timeline, group.data])
  );

  console.log('utils', response);

  const updated = prev.map((prevGroup) => {
    const newData: any = latestByTimeline.get(prevGroup.timeline);
    if (!newData) return prevGroup;

    // Avoid duplicates based on `id`
    const existingIds = new Set(prevGroup.data.map((item: any) => item.id));
    const filteredNew = newData.filter((item: any) => !existingIds.has(item.id));

    let newPaginationData: any;

    if (addFrom === ADD_FORM.TOP) {
      newPaginationData = [...filteredNew, ...prevGroup.data];
    } else {
      newPaginationData = [...prevGroup.data, ...filteredNew];
    }

    return {
      ...prevGroup,
      data: newPaginationData,
    };
  });

  // Add new timelines not in previous data
  const existingTimelines = new Set(prev.map((g) => g.timeline));
  const newGroups = response.data.data.filter(
    (group: any) => !existingTimelines.has(group.timeline)
  );

  return [...updated, ...newGroups];
};
