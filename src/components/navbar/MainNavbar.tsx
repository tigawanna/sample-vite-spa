import { DaisyuiThemesSelect } from "../daisyui/DaisyuiThemesSelect";

interface MainNavbarProps {

}

export function MainNavbar({}:MainNavbarProps){
return (
 <div className='w-full h-14 flex px-3 bg-base-200 gap-2 items-center justify-between sticky top-0'>
    <h1 className='text-3xl font-bold'>home</h1>
    <DaisyuiThemesSelect/>
 </div>
);
}
