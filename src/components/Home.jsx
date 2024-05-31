import Header from './Header';
import SearchMain from './SearchMain';

function Home() {
    return(
        <div className="flex justify-center w-full">
            <div className="flex flex-col h-full p-4 w-1/2">
                <div className='flex-shrink-0 flex-grow-0 border-none p-2'>
                    <Header />
                </div>
                <div className='flex-grow flex-shrink basis-full bg-layout_content_bg p-2'>
                    <SearchMain />
                </div>  
            </div>
        </div>
    )
}

export default Home;