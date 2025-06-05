import { fetchPokemon } from '@/api/fetchPokemon';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';

const HomePageComponent = () => {
  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: () => fetchPokemon({ name: 'bulbasaur' }),
  });

  console.log('data', data);

  return (
    <div className='flex flex-col w-full items-center shrink-0 self-center'>
      <p className='textSize-9 text-green-500'>{t('Common_Welcome_Home', { lng: 'en' })}</p>
      <p className='textSize-8 text-green-500'>{t('Common_Welcome_Home', { lng: 'en' })}</p>
      <p className='textSize-7 text-green-500'>{t('Common_Welcome_Home', { lng: 'en' })}</p>
      <p className='textSize-6'>{t('Common_Welcome_Home', { lng: 'en' })}</p>
      <p className='textSize-5'>{t('Common_Welcome_Home', { lng: 'en' })}</p>
      <p className='textSize-4'>{t('Common_Welcome_Home', { lng: 'en' })}</p>
      <p className='textSize-3'>{t('Common_Welcome_Home', { lng: 'en' })}</p>
      <p className='textSize-2'>{t('Common_Welcome_Home', { lng: 'en' })}</p>
      <p className='textSize-1'>{t('Common_Welcome_Home', { lng: 'en' })}</p>
    </div>
  );
};

export default HomePageComponent;
