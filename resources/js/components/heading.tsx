import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import React from 'react';

export default function Heading({ title, description, buttons }: { title: string; description?: string; buttons?: React.ReactNode }) {
    return (
        <div className="mb-4 flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
            <div>
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </div>

            {/* Desktop view - buttons displayed normally */}
            {buttons && <div className="hidden lg:flex lg:justify-end lg:gap-2">{buttons}</div>}

            {/* Mobile view - drawer implementation */}
            {buttons && (
                <div className="flex justify-end lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Menu className="h-4 w-4" />
                                Bağlantılar
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom">
                            <SheetHeader>
                                <SheetTitle>Bağlantılar</SheetTitle>
                                <SheetDescription>{title} için bağlantılar</SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-2 px-3 pb-8">
                                {React.Children.map(buttons, (button) => {
                                    // Recursive function to handle nested components
                                    const processNestedComponents = (element: React.ReactElement, depth = 0, maxDepth = 5): React.ReactNode => {
                                        if (!React.isValidElement(element) || depth >= maxDepth) {
                                            return element;
                                        }

                                        // Handle Button component
                                        const elementProps = element.props as { [key: string]: any; className?: string };
                                        if (element.type === Button || (elementProps && elementProps['data-slot'] === 'button')) {
                                            return React.cloneElement(element, {
                                                // @ts-ignore
                                                className: `w-full justify-start ${elementProps.className || ''}`,
                                            });
                                        }

                                        // Handle components with children
                                        const props = element.props as { children?: React.ReactNode };
                                        if (props && props.children) {
                                            // If single child is a React element
                                            if (React.isValidElement(props.children)) {
                                                return React.cloneElement(element, {}, processNestedComponents(props.children, depth + 1, maxDepth));
                                            }

                                            // If multiple children
                                            if (Array.isArray(props.children)) {
                                                return React.cloneElement(
                                                    element,
                                                    {},
                                                    React.Children.map(props.children, (child) =>
                                                        React.isValidElement(child) ? processNestedComponents(child, depth + 1, maxDepth) : child,
                                                    ),
                                                );
                                            }
                                        }

                                        return element;
                                    };

                                    return React.isValidElement(button) ? processNestedComponents(button) : button;
                                })}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            )}
        </div>
    );
}
