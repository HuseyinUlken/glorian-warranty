import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { Home, Link2 } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Button } from './ui/button';
export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    const [open, setOpen] = useState(false);

    if (breadcrumbs.length === 0) return null;

    const isMobile = window.innerWidth < 768;
    const lastItem = breadcrumbs[breadcrumbs.length - 1];
    const homeLink = (
        <>
            <Button data-sidebar="trigger" data-slot="sidebar-trigger" variant="ghost" size="icon" className={'h-7 w-7'}>
                <Home />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
        </>
    );
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {isMobile ? (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={breadcrumbs[0].href}>{breadcrumbs[0].title === 'home' ? homeLink : breadcrumbs[0].title}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {breadcrumbs.length > 2 && (
                            <>
                                {' '}
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Sheet open={open} onOpenChange={setOpen}>
                                        <SheetTrigger asChild>
                                            <BreadcrumbEllipsis className="cursor-pointer" />
                                        </SheetTrigger>
                                        <SheetContent side="top">
                                            <SheetHeader>
                                                <SheetTitle>Gezinti</SheetTitle>
                                            </SheetHeader>
                                            <div className="mb-4 flex flex-col gap-2">
                                                {breadcrumbs.map((item, index) => (
                                                    <Link
                                                        key={index}
                                                        href={item.href}
                                                        className="hover:bg-muted flex items-center rounded-md px-4 py-2"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="bg-primary text-primary-foreground mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                                                            {index + 1}
                                                        </span>
                                                        <Link2 className="text-muted-foreground mr-2 text-sm" />
                                                        {item.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </BreadcrumbItem>
                            </>
                        )}
                        {breadcrumbs.length !== 1 && (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{lastItem.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <>
                                                {item.title === 'home' ? (
                                                    <BreadcrumbPage>{homeLink}</BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                                )}
                                            </>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={item.href}>{item.title === 'home' ? homeLink : item.title}</Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </Fragment>
                            );
                        })}
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
