import { ReactQueryProvider } from './react-query-provider';
import { ToasterProvider } from './toaster-provider';

export function AppProvider() {
  return (
    <ReactQueryProvider>
        
      <ToasterProvider />
    </ReactQueryProvider>
  );
}