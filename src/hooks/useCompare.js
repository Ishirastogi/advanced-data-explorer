import { useCompare as useContextCompare } from '../contexts/CompareContext';  // Renaming to avoid conflict

const useCompare = () => {
  return useContextCompare();  // Using the renamed hook
};

export default useCompare;  // Exporting your custom hook
