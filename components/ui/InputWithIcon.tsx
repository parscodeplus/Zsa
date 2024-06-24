import * as React from 'react';
import { LucideIcon } from "lucide-react"
import { cn } from '@/lib/utils';
// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   startIcon: any;
//   endIcon:any;
// }
export interface InputProps
   extends React.InputHTMLAttributes<HTMLInputElement> {
   startIcon?:any | LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
   endIcon?:any | LucideIcon |  React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, startIcon, endIcon, ...props }, ref) => {
        const StartIcon = startIcon;
        const EndIcon = endIcon;
        return (
            <div className="w-full relative">
                {StartIcon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <StartIcon.type
                            className={cn('h-[18px] w-[18px]')}
                            {...startIcon.props}
                        />
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        startIcon ? 'pl-8' : '',
                        endIcon ? 'pr-8' : '',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {EndIcon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <EndIcon.type
                            className={cn('h-[18px] w-[18px]')}
                            {...endIcon.props}
                        />
                    </div>
                )}
            </div>
        );
    }
);
InputWithIcon.displayName = 'InputWithIcon';

export { InputWithIcon };