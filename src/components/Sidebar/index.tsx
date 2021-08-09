import { Fragment, useState, ReactNode, FC } from "react";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";

import Badge, { BadgeProps } from "../Badge";
import Icon, { ICON_TYPES } from "../Icon";

type ActionTab = {
  /**
   * 名称
   */
  name: string;
  /**
   * 链接 URL
   */
  href: string;
  /**
   * ICON 名称
   */
  icon?: ICON_TYPES;
  /**
   * 是否新页面打开
   */
  blank?: boolean;
  /**
   * badge 角标类型
   */
  badgeType?: BadgeProps["type"];
  /**
   * badge 角标内容
   */
  badgeContent?: ReactNode;
};

const DEFAULT_SIDEBAR_WALLET_NAVIGATION: ActionTab[] = [];
const DEFAULT_TRADE_NAVIGATION: ActionTab[] = [
  {
    name: "Portfolio",
    href: "https://portfolio.onekey.so/",
    icon: "TRENDING-UP-OUTLINED",
    blank: false,
  },
  {
    name: "Swap",
    href: "https://swap.onekey.so/",
    icon: "SWITCH-HORIZONTAL-OUTLINED",
    blank: false,
  },
  {
    name: "Explore",
    href: "https://discover.onekey.so/",
    icon: "COMPASS-OUTLINED",
    badgeType: "added",
    badgeContent: "BETA",
    blank: true,
  },
];
const DEFAULT_SIDEBAR_EXTRA_ACTIONS: ActionTab[] = [];

const DEFAULT_SIDEBAR_CONFIG = {
  walletNavigation: DEFAULT_SIDEBAR_WALLET_NAVIGATION,
  tradeNavigation: DEFAULT_TRADE_NAVIGATION,
  extraActions: DEFAULT_SIDEBAR_EXTRA_ACTIONS,
} as const;

type SidebarProps = {
  walletNavigation: ActionTab[];
  tradeNavigation: ActionTab[];
  extraActions: ActionTab[];
};

const Sidebar: FC<SidebarProps> = ({
  walletNavigation,
  tradeNavigation,
  extraActions,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = {
    pathname: "https://portfolio.onekey.so/",
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="flex justify-between py-1 bg-white border-b border-gray-100 lg:hidden dark:bg-gray-800 dark:border-gray-700">
        {/* Brand */}
        <div className="flex items-center flex-shrink-0 pl-4">
          <Icon
            className="w-7 h-7 text-brand-500 dark:text-brand-400"
            name="BRAND-LOGO-FILLED"
            aria-label="The Brand Logo – OneKey"
          />
        </div>
        {/* Menu Button */}
        <button
          className="p-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand lg:hidden"
          onClick={() => setSidebarOpen(true)}
          type="button"
        >
          {/* TODO i18n */}
          <span className="sr-only">Open sidebar</span>
          <span className="w-6 h-6" aria-hidden="true">
            <Icon
              onClick={() => setSidebarOpen(!sidebarOpen)}
              name="MENU-OUTLINED"
              className="w-6 h-6 text-gray-500 dark:text-gray-400"
            />
          </span>
        </button>
      </div>
      {/* Mobile Header End */}
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-40 flex lg:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs py-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {/* Close Button */}
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <Icon
                      className="w-6 h-6 text-white"
                      src="/icons/outline-x.svg"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {/* Close Button End */}
              </Transition.Child>
              {/* Brand */}
              <div className="flex items-center flex-shrink-0 pl-[22px]">
                <Icon
                  className="w-7 h-7 text-brand-500 dark:text-brand-400"
                  name="BRAND-LOGO-FILLED"
                  aria-label="The Brand Logo – OneKey"
                />
              </div>
              <div className="flex flex-col flex-1 h-0 px-4 overflow-y-auto">
                {/* Navigation */}
                <nav className="mt-6 space-y-6">
                  {/* Wallet */}
                  {!!walletNavigation?.length && (
                    <div>
                      {/* Group Title */}
                      <div className="pl-2 mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                        Wallet
                      </div>
                      <div className="space-y-1">
                        {walletNavigation.map((item) => (
                          // <Link key={item.name} href={item.href}>
                          <a
                            href={item.href}
                            key={item.name}
                            className={classNames(
                              item.href === router.pathname
                                ? "bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white",
                              "group justify-between flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            )}
                            aria-current={
                              item.href === router.pathname ? "page" : undefined
                            }
                          >
                            <div className="flex items-center">
                              {!!item.icon && (
                                <Icon
                                  className={classNames(
                                    "mr-3 flex-shrink-0 h-6 w-6",
                                    item.href === router.pathname
                                      ? "text-gray-500 dark:text-gray-400"
                                      : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400"
                                  )}
                                  name={item.icon}
                                  aria-hidden="true"
                                />
                              )}
                              {item.name}
                            </div>
                            {/* Show badge if badgeType exist. */}
                            {item.badgeType && (
                              <Badge type={item.badgeType}>
                                {item.badgeContent}
                              </Badge>
                            )}
                          </a>
                          // </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Wallet End */}
                  {/* Trade */}
                  <div>
                    {/* Group Title */}
                    <div className="pl-2 mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                      Trade
                    </div>
                    <div className="space-y-1">
                      {tradeNavigation.map((item) => (
                        // <Link key={item.name} href={item.href}>
                        <a
                          key={item.name}
                          href={item.href}
                          target={item.blank ? "_blank" : "_self"}
                          className={classNames(
                            item.href === router.pathname
                              ? "bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white",
                            "group justify-between flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          )}
                          aria-current={
                            item.href === router.pathname ? "page" : undefined
                          }
                        >
                          <div className="flex items-center">
                            {!!item.icon && (
                              <Icon
                                className={classNames(
                                  "mr-3 flex-shrink-0 h-6 w-6",
                                  item.href === router.pathname
                                    ? "text-gray-500 dark:text-gray-400"
                                    : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400"
                                )}
                                name={item.icon}
                                aria-hidden="true"
                              />
                            )}
                            {item.name}
                          </div>
                          {/* Show badge if badgeType exist. */}
                          {item.badgeType && (
                            <Badge type={item.badgeType}>
                              {item.badgeContent}
                            </Badge>
                          )}
                        </a>
                        // </Link>
                      ))}
                    </div>
                  </div>
                  {/* Trade End */}
                </nav>
                {/* Navigation End */}
                {/* Extra Actions */}
                <div className="mt-auto">
                  <div className="space-y-1">
                    {extraActions.map((item) => (
                      // <Link key={item.name} href={item.href}>
                      <a
                        href={item.href}
                        key={item.name}
                        className={classNames(
                          item.href === router.pathname
                            ? "bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white",
                          "group justify-between flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                        aria-current={
                          item.href === router.pathname ? "page" : undefined
                        }
                      >
                        <div className="flex items-center">
                          {!!item.icon && (
                            <Icon
                              className={classNames(
                                "mr-3 flex-shrink-0 h-6 w-6",
                                item.href === router.pathname
                                  ? "text-gray-500 dark:text-gray-400"
                                  : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400"
                              )}
                              name={item.icon}
                              aria-hidden="true"
                            />
                          )}
                          {item.name}
                        </div>
                        {/* Show badge if badgeType exist. */}
                        {item.badgeType && (
                          <Badge type={item.badgeType}>
                            {item.badgeContent}
                          </Badge>
                        )}
                      </a>
                      // </Link>
                    ))}
                  </div>
                </div>
                {/* Extra Actions End */}
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      {/* Mobile Sidebar End */}
      {/* Desktop Sidebar */}
      <div className="relative hidden lg:flex lg:flex-shrink-0 sidebar h-full">
        <div
          className={classNames(
            "flex flex-col py-5 border-r border-gray-100 bg-gray-50 dark:bg-gray-800 dark:border-gray-700",
            isCollapsed ? "w-auto" : "w-64"
          )}
        >
          {/* Brand */}
          <div className="flex items-center flex-shrink-0 pl-[22px]">
            <Icon
              className="w-7 h-7 text-brand-500 dark:text-brand-400"
              name="BRAND-LOGO-FILLED"
              aria-label="The Brand Logo – OneKey"
            />
          </div>
          {/* Brand End */}
          <div className="flex flex-col flex-1 h-0 px-4 overflow-y-auto">
            {/* Device Selector */}
            {/* <DeviceSelector /> */}
            {/* Navigation */}
            <nav className="mt-6 space-y-6">
              {/* Wallet */}
              {!!walletNavigation?.length && (
                <div>
                  {/* Group Title */}
                  <div
                    className={classNames(
                      "pl-2 mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400",
                      { hidden: isCollapsed }
                    )}
                  >
                    Wallet
                  </div>
                  <div className="space-y-1">
                    {walletNavigation.map((item) => (
                      // <Link key={item.name} href={item.href}>
                      <a
                        href={item.href}
                        key={item.name}
                        className={classNames(
                          item.href === router.pathname
                            ? "bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white",
                          "group justify-between flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                        aria-current={
                          item.href === router.pathname ? "page" : undefined
                        }
                      >
                        <div className="flex items-center">
                          <Icon
                            className={classNames(
                              "flex-shrink-0 h-6 w-6",
                              item.href === router.pathname
                                ? "text-gray-500 dark:text-gray-400"
                                : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400"
                            )}
                            src={item.iconUrl}
                            aria-hidden="true"
                          />
                          {!isCollapsed && (
                            <span className="ml-3">{item.name}</span>
                          )}
                        </div>
                        {/* Show badge if badgeType exist. */}
                        {item.badgeType && (
                          <Badge type={item.badgeType}>
                            {item.badgeContent}
                          </Badge>
                        )}
                      </a>
                      // </Link>
                    ))}
                  </div>
                </div>
              )}
              {/* Wallet End */}
              {/* Trade */}
              <div>
                {/* Group Title */}
                <div
                  className={classNames(
                    "pl-2 mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400",
                    { hidden: isCollapsed }
                  )}
                >
                  Trade
                </div>
                <div className="space-y-1">
                  {tradeNavigation.map((item) => (
                    // <Link key={item.name} href={item.href}>
                    <a
                      key={item.name}
                      href={item.href}
                      target={item.blank ? "_blank" : "_self"}
                      className={classNames(
                        item.href === router.pathname
                          ? "bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white",
                        "group justify-between flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                      aria-current={
                        item.href === router.pathname ? "page" : undefined
                      }
                    >
                      <div className="flex items-center">
                        {!!item.icon && (
                          <Icon
                            className={classNames(
                              "flex-shrink-0 h-6 w-6",
                              item.href === router.pathname
                                ? "text-gray-500 dark:text-gray-400"
                                : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400"
                            )}
                            name={item.icon}
                            aria-hidden="true"
                          />
                        )}

                        {!isCollapsed && (
                          <span className="ml-3">{item.name}</span>
                        )}
                      </div>
                      {/* Show badge if badgeType exist. */}
                      {item.badgeType && (
                        <Badge
                          className={classNames({ hidden: isCollapsed })}
                          type={item.badgeType}
                        >
                          {item.badgeContent}
                        </Badge>
                      )}
                    </a>
                    // </Link>
                  ))}
                </div>
              </div>
              {/* Trade End */}
            </nav>
            {/* Navigation End */}
            {/* Extra Actions */}
            <div className="mt-auto">
              <div className="space-y-1">
                {extraActions.map((item) => (
                  // <Link key={item.name} href={item.href}>
                  <a
                    href={item.href}
                    key={item.name}
                    className={classNames(
                      item.href === router.pathname
                        ? "bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white",
                      "group justify-between flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={
                      item.href === router.pathname ? "page" : undefined
                    }
                  >
                    <div className="flex items-center">
                      {!!item.icon && (
                        <Icon
                          className={classNames(
                            "flex-shrink-0 h-6 w-6",
                            item.href === router.pathname
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400"
                          )}
                          name={item.icon}
                          aria-hidden="true"
                        />
                      )}

                      {!isCollapsed && (
                        <span className="ml-3">{item.name}</span>
                      )}
                    </div>
                    {/* Show badge if badgeType exist. */}
                    {item.badgeType && (
                      <Badge type={item.badgeType}>{item.badgeContent}</Badge>
                    )}
                  </a>
                  // </Link>
                ))}
              </div>
            </div>
            {/* Extra Actions End */}
          </div>
        </div>
        {/* Toggle Button */}
        <div className="absolute top-0 bottom-0 right-0 z-10 translate-x-1/2">
          <button
            className="flex justify-center w-6 h-full group"
            type="button"
            onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
          >
            <div className="w-0.5 h-full transition bg-transparent group-hover:bg-brand-500" />
            <div className="absolute p-1.5 bg-white border border-gray-200 rounded-full top-4 shadow-sm dark:bg-gray-900 dark:border-gray-700 opacity-0 transition scale-75 collapse-indicate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={classNames("w-5 h-5 text-gray-400", {
                  "rotate-180 translate-x-px": isCollapsed,
                })}
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      {/* Desktop Sidebar End */}
    </>
  );
};

Sidebar.defaultProps = DEFAULT_SIDEBAR_CONFIG;

export default Sidebar;