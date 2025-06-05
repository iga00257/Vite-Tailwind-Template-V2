import { useLayout } from '@/hooks/useLayout';
import SuspenseContent from '@/layout/SuspenseContent';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const BasicLayout = () => {
  useLayout();
  return (
    <div className='flex min-h-screen w-full flex-col desktop:flex-row desktop:relative'>
      <Suspense fallback={<SuspenseContent />}>
        <div className='flex min-h-screen w-full flex-col desktop:flex-row desktop:relative'>
          <div className='h-full w-full min-h-screen flex'>
            <Outlet />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default BasicLayout;
