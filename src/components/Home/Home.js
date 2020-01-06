import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import Header from './../Header/Header';
import routes from './../../routes';
import { menus_EN, menus_VI } from './../../constants/Menu';

const messages = defineMessages({
    menu: {
        id: 'Sidebar.Menu.title',
        defaultMessage: 'Menu',
    }
});

const MenuLink = ({ label, to, icon, sub_menu, display, activeOnlyWhenExact }) => {
    var menuRouter = '';
    if (sub_menu.length > 0) {
        var subMenu = null;

        menuRouter = <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                var classMenu = sub_menu.length > 0 ? 'treeview' : '';
                var active = match ? ' active menu-open ' : '';
                if (sub_menu.length > 0) {
                    subMenu = sub_menu.map((sub_menu, index) => {
                        return (
                            <MenuSubLink
                                key={index}
                                label={sub_menu.name}
                                to={sub_menu.to}
                                icon={sub_menu.icon}
                                sub_menu={sub_menu.sub_menu}
                                display={sub_menu.display}
                                activeOnlyWhenExact={sub_menu.exact} />
                        );
                    });
                }
                return (
                    <li className={active + classMenu} >
                        <Link to={to} >
                            <Icon type={icon} />
                            <span> {label}</span>
                            {sub_menu.length > 0 ?
                                <span className="pull-right-container">
                                    <Icon type="left" />
                                </span>
                                : ''}
                        </Link>
                        <ul className={sub_menu.length > 0 ? 'treeview-menu' : 'treeview'}>
                            {sub_menu.length > 0 ? subMenu : ''}
                        </ul>

                    </li>
                );
            }
            }
        />
        if (!display) {
            menuRouter = '';
        }
    } else {
        if (display) {
            menuRouter = <Route
                path={to}
                exact={activeOnlyWhenExact}
                children={({ match }) => {
                    var classMenu = sub_menu.length > 0 ? 'treeview' : '';
                    var active = match ? ' active  menu-open ' : '';
                    return (
                        <li className={active + classMenu} >
                            <Link to={to} >
                                <Icon type={icon} />
                                <span> {label}</span>
                                {sub_menu.length > 0 ?
                                    <span className="pull-right-container">
                                        <Icon type="left" />
                                    </span>
                                    : ''}
                            </Link>
                            <ul className='treeview'>
                            </ul>
                        </li>
                    );
                }}
            />
        }
    }

    return (
        menuRouter
    );
};

const MenuSubLink = ({ label, to, icon, sub_menu, display, activeOnlyWhenExact }) => {
    var subMenuRouter = '';
    if (sub_menu.length > 0) {
        var subMenu = null;
        subMenuRouter = <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match, location }) => {
                var classMenu = sub_menu.length > 0 ? 'treeview' : '';
                var active = match ? ' active menu-open ' : '';
                if (sub_menu.length > 0) {
                    subMenu = sub_menu.map((sub_menu, index) => {
                        return (
                            <MenuSubLink
                                key={index}
                                label={sub_menu.name}
                                to={sub_menu.to}
                                icon={sub_menu.icon}
                                sub_menu={sub_menu.sub_menu}
                                display={sub_menu.display}
                                activeOnlyWhenExact={sub_menu.exact} />
                        );
                    });
                }

                return (
                    <li className={active + classMenu} >
                        <Link to={to}>
                            <i className={`iconfont ${icon}`}></i>
                            <span> {label}</span>
                            {sub_menu.length > 0 ?
                                <span className="pull-right-container">
                                    <Icon type="left" />
                                </span>
                                : ''}
                        </Link>
                        <ul className={sub_menu.length > 0 ? 'treeview-menu' : 'treeview'}>
                            {sub_menu.length > 0 ? subMenu : ''}
                        </ul>

                    </li>
                );
            }}
        />

        if (!display) {
            subMenuRouter = '';
        }

    } else {
        if (display) {
            subMenuRouter = <Route
                path={to}
                exact={activeOnlyWhenExact}
                children={({ match }) => {
                    var classMenu = sub_menu.length > 0 ? 'treeview' : '';
                    var active = match ? ' active menu-open ' : '';

                    return (
                        <li className={active + classMenu} >
                            <Link to={to}>
                                <i className={`iconfont ${icon}`}></i>
                                <span> {label}</span>
                                {sub_menu.length > 0 ?
                                    <span className="pull-right-container">
                                        <Icon type="left" />
                                    </span>
                                    : ''}
                            </Link>
                            <ul className='treeview'>
                            </ul>
                        </li>
                    );
                }}
            />
        }
    }
    return (
        subMenuRouter
    );
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_menu: [],
        }
    }

    makeTreeData = () => {
        var DataKey = 'lte.tree';

        var Default = {
            animationSpeed: 500,
            accordion: true,
            followLink: false,
            trigger: '.treeview a'
        };

        var Selector = {
            tree: '.tree',
            treeview: '.treeview',
            treeviewMenu: '.treeview-menu',
            open: '.menu-open, .active',
            li: 'li',
            data: '[data-widget="tree"]',
            active: '.active'
        };

        var ClassName = {
            open: 'menu-open',
            tree: 'tree'
        };

        var Event = {
            collapsed: 'collapsed.tree',
            expanded: 'expanded.tree'
        };

        // Tree Class Definition
        // =====================
        var Tree = function (element, options) {
            this.element = element;
            this.options = options;

            $(this.element).addClass(ClassName.tree);

            $(Selector.treeview + Selector.active, this.element).addClass(ClassName.open);

            this._setUpListeners();
        };

        Tree.prototype.toggle = function (link, event) {
            var treeviewMenu = link.next(Selector.treeviewMenu);
            var parentLi = link.parent();
            var isOpen = parentLi.hasClass(ClassName.open);

            if (!parentLi.is(Selector.treeview)) {
                return;
            }

            if (!this.options.followLink || link.attr('href') === '#') {
                event.preventDefault();
            }

            if (isOpen) {
                this.collapse(treeviewMenu, parentLi);
            } else {
                this.expand(treeviewMenu, parentLi);
            }
        };

        Tree.prototype.expand = function (tree, parent) {
            var expandedEvent = $.Event(Event.expanded);

            if (this.options.accordion) {
                var openMenuLi = parent.siblings(Selector.open);
                var openTree = openMenuLi.children(Selector.treeviewMenu);
                this.collapse(openTree, openMenuLi);
            }

            parent.addClass(ClassName.open);
            tree.slideDown(this.options.animationSpeed, function () {
                $(this.element).trigger(expandedEvent);
            }.bind(this));
        };

        Tree.prototype.collapse = function (tree, parentLi) {
            var collapsedEvent = $.Event(Event.collapsed);

            tree.find(Selector.open).removeClass(ClassName.open);
            parentLi.removeClass(ClassName.open);
            tree.slideUp(this.options.animationSpeed, function () {
                tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
                $(this.element).trigger(collapsedEvent);
            }.bind(this));
        };

        // Private

        Tree.prototype._setUpListeners = function () {
            var that = this;
            $(this.element).on('click', this.options.trigger, function (event) {
                that.toggle($(this), event);
            });
        };

        // Plugin Definition
        // =================
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data(DataKey);

                if (!data) {
                    var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
                    $this.data(DataKey, new Tree($this, options));
                }
            });
        }

        var old = $.fn.tree;

        $.fn.tree = Plugin;
        $.fn.tree.Constructor = Tree;

        // No Conflict Mode
        // ================
        $.fn.tree.noConflict = function () {
            $.fn.tree = old;
            return this;
        };

        // Tree Data API
        // =============
        $(Selector.data).each(function () {
            Plugin.call($(this));
        });
    }


    makeLayout = () => {
        var DataKey = 'lte.layout';

        var Default = {
            slimscroll: true,
            resetHeight: true
        };

        var Selector = {
            wrapper: '.wrapper',
            contentWrapper: '.content-wrapper',
            layoutBoxed: '.layout-boxed',
            mainFooter: '.main-footer',
            mainHeader: '.main-header',
            sidebar: '.sidebar',
            controlSidebar: '.control-sidebar',
            fixed: '.fixed',
            sidebarMenu: '.sidebar-menu',
            logo: '.main-header .logo'
        };

        var ClassName = {
            fixed: 'fixed',
            holdTransition: 'hold-transition'
        };

        var Layout = function (options) {
            this.options = options;
            this.bindedResize = false;
            this.activate();
        };

        Layout.prototype.activate = function () {
            this.fix();
            this.fixSidebar();

            $('body').removeClass(ClassName.holdTransition);

            if (this.options.resetHeight) {
                $('body, html, ' + Selector.wrapper).css({
                    'height': 'auto',
                    'min-height': '100%',
                });
            }

            if (!this.bindedResize) {
                $(window).resize(function () {
                    this.fix();
                    this.fixSidebar();

                    $(Selector.logo + ', ' + Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                        this.fix();
                        this.fixSidebar();
                    }.bind(this));
                }.bind(this));

                this.bindedResize = true;
            }

            $(Selector.sidebarMenu).on('expanded.tree', function () {
                this.fix();
                this.fixSidebar();
            }.bind(this));

            $(Selector.sidebarMenu).on('collapsed.tree', function () {
                this.fix();
                this.fixSidebar();
            }.bind(this));
        };

        Layout.prototype.fix = function () {
            // Remove overflow from .wrapper if layout-boxed exists
            $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden');

            // Get window height and the wrapper height
            var footerHeight = $(Selector.mainFooter).outerHeight() || 0;
            var neg = $(Selector.mainHeader).outerHeight() + footerHeight;
            var windowHeight = $(window).height();
            var sidebarHeight = $(Selector.sidebar).height() || 0;

            // Set the min-height of the content and sidebar based on
            // the height of the document.
            if ($('body').hasClass(ClassName.fixed)) {
                $(Selector.contentWrapper).css('min-height', windowHeight - footerHeight);
            } else {
                var postSetHeight;

                if (windowHeight >= sidebarHeight) {
                    $(Selector.contentWrapper).css('min-height', windowHeight - neg);
                    postSetHeight = windowHeight - neg;
                } else {
                    $(Selector.contentWrapper).css('min-height', sidebarHeight);
                    postSetHeight = sidebarHeight;
                }

                // Fix for the control sidebar height
                var $controlSidebar = $(Selector.controlSidebar);
                if (typeof $controlSidebar !== 'undefined') {
                    if ($controlSidebar.height() > postSetHeight)
                        $(Selector.contentWrapper).css('min-height', $controlSidebar.height());
                }
            }
        };

        Layout.prototype.fixSidebar = function () {
            // Make sure the body tag has the .fixed class
            if (!$('body').hasClass(ClassName.fixed)) {
                if (typeof $.fn.slimScroll !== 'undefined') {
                    $(Selector.sidebar).slimScroll({ destroy: true }).height('auto');
                }
                return;
            }

            // Enable slimscroll for fixed layout
            if (this.options.slimscroll) {
                if (typeof $.fn.slimScroll !== 'undefined') {
                    // Destroy if it exists
                    // $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')

                    // Add slimscroll
                    $(Selector.sidebar).slimScroll({
                        height: ($(window).height() - $(Selector.mainHeader).height()) + 'px'
                    });
                }
            }
        };

        // Plugin Definition
        // =================
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data(DataKey);

                if (!data) {
                    var options = $.extend({}, Default, $this.data(), typeof option === 'object' && option);
                    $this.data(DataKey, (data = new Layout(options)));
                }

                if (typeof option === 'string') {
                    if (typeof data[option] === 'undefined') {
                        throw new Error('No method named ' + option);
                    }
                    data[option]();
                }
            });
        }

        var old = $.fn.layout;

        $.fn.layout = Plugin;
        $.fn.layout.Constuctor = Layout;

        // No conflict mode
        // ================
        $.fn.layout.noConflict = function () {
            $.fn.layout = old;
            return this;
        };

        // Layout DATA-API
        // ===============
        Plugin.call($('body'));
    }


    pushMenu = () => {
        var DataKey = 'lte.pushmenu';

        var Default = {
            collapseScreenSize: 767,
            expandOnHover: false,
            expandTransitionDelay: 200
        };

        var Selector = {
            collapsed: '.sidebar-collapse',
            open: '.sidebar-open',
            mainSidebar: '.main-sidebar',
            contentWrapper: '.content-wrapper',
            searchInput: '.sidebar-form .form-control',
            button: '[data-toggle="push-menu"]',
            mini: '.sidebar-mini',
            expanded: '.sidebar-expanded-on-hover',
            layoutFixed: '.fixed'
        };

        var ClassName = {
            collapsed: 'sidebar-collapse',
            open: 'sidebar-open',
            mini: 'sidebar-mini',
            expanded: 'sidebar-expanded-on-hover',
            expandFeature: 'sidebar-mini-expand-feature',
            layoutFixed: 'fixed'
        };

        var Event = {
            expanded: 'expanded.pushMenu',
            collapsed: 'collapsed.pushMenu'
        };

        // PushMenu Class Definition
        // =========================
        var PushMenu = function (options) {
            this.options = options;
            this.init();
        };

        PushMenu.prototype.init = function () {
            if (this.options.expandOnHover
                || ($('body').is(Selector.mini + Selector.layoutFixed))) {
                this.expandOnHover();
                $('body').addClass(ClassName.expandFeature);
            }

            $(Selector.contentWrapper).click(function () {
                // Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= this.options.collapseScreenSize && $('body').hasClass(ClassName.open)) {
                    this.close();
                }
            }.bind(this));

            // __Fix for android devices
            $(Selector.searchInput).click(function (e) {
                e.stopPropagation();
            });
        };

        PushMenu.prototype.toggle = function () {
            var windowWidth = $(window).width();
            var isOpen = !$('body').hasClass(ClassName.collapsed);

            if (windowWidth <= this.options.collapseScreenSize) {
                isOpen = $('body').hasClass(ClassName.open);
            }

            if (!isOpen) {
                this.open();
            } else {
                this.close();
            }
        };

        PushMenu.prototype.open = function () {
            var windowWidth = $(window).width();

            if (windowWidth > this.options.collapseScreenSize) {
                $('body').removeClass(ClassName.collapsed)
                    .trigger($.Event(Event.expanded));
            }
            else {
                $('body').addClass(ClassName.open)
                    .trigger($.Event(Event.expanded));
            }
        };

        PushMenu.prototype.close = function () {
            var windowWidth = $(window).width();
            if (windowWidth > this.options.collapseScreenSize) {
                $('body').addClass(ClassName.collapsed)
                    .trigger($.Event(Event.collapsed));
            } else {
                $('body').removeClass(ClassName.open + ' ' + ClassName.collapsed)
                    .trigger($.Event(Event.collapsed));
            }
        };

        PushMenu.prototype.expandOnHover = function () {
            $(Selector.mainSidebar).hover(function () {
                if ($('body').is(Selector.mini + Selector.collapsed)
                    && $(window).width() > this.options.collapseScreenSize) {
                    this.expand();
                }
            }.bind(this), function () {
                if ($('body').is(Selector.expanded)) {
                    this.collapse();
                }
            }.bind(this));
        };

        PushMenu.prototype.expand = function () {
            setTimeout(function () {
                $('body').removeClass(ClassName.collapsed)
                    .addClass(ClassName.expanded);
            }, this.options.expandTransitionDelay);
        };

        PushMenu.prototype.collapse = function () {
            setTimeout(function () {
                $('body').removeClass(ClassName.expanded)
                    .addClass(ClassName.collapsed);
            }, this.options.expandTransitionDelay);
        };

        // PushMenu Plugin Definition
        // ==========================
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data(DataKey);

                if (!data) {
                    var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
                    $this.data(DataKey, (data = new PushMenu(options)));
                }

                if (option === 'toggle') data.toggle();
            });
        }

        var old = $.fn.pushMenu;

        $.fn.pushMenu = Plugin;
        $.fn.pushMenu.Constructor = PushMenu;

        // No Conflict Mode
        // ================
        $.fn.pushMenu.noConflict = function () {
            $.fn.pushMenu = old;
            return this;
        };

        // Data API
        // ========
        $(document).on('click', Selector.button, function (e) {
            e.preventDefault();
            Plugin.call($(this), 'toggle');
        });

        Plugin.call($(Selector.button));
    }

    componentDidMount() {
        $('body').removeClass('login-page');
        $('body').removeClass('hold-transition');
        $('body').addClass('sidebar-mini');
        $('body').addClass('skin-green-light');
        // this.makeLayout();
        // this.pushMenu();
        this.makeTreeData();
    }

    componentWillReceiveProps(nextProps) {
        //if changed screen then remove that screen 
        if (nextProps.location !== this.props.location) {
            this.props.onChangeRouter()
        }
    }

    render() {
        let menus = this.props.language == 'en' ? menus_EN : menus_VI;
        let menu = JSON.parse(JSON.stringify(menus));
        this.getMenu(menu);

        return (
            <div className="wrapper">
                <Header />
                <aside className="main-sidebar">
                    <section className="sidebar">
                        <ul id='sidebar-menu' className="sidebar-menu" data-widget="tree">
                            <li className="header"><FormattedMessage {...messages.menu}/></li>
                            {this.showMenus(menu)}
                        </ul>
                    </section>
                </aside>
                {this.showContentMenus(routes)}
            </div>
        );
    }

    showMenus = (menus) => {
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <MenuLink
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        icon={menu.icon}
                        sub_menu={menu.sub_menu}
                        display={menu.display}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            });
        }
        return result;
    }
    /**
     * show content menu
     */
    showContentMenus = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                );
            });
        }
        return <Switch>
            {result}
        </Switch>;
    }


    /**
     *  get menu for user
     * */
    getMenu(menu, roles) {
        for (var i = 0; i < menu.length; i++) {
            if (menu[i].sub_menu.length == 0) {
                // var result = false;
                // roles.forEach(role => {
                //     if (role.key == menu[i].key) {
                //         result = true;
                //     }
                // });
                // if (result) {

                // }
                menu[i].display = true;
            } else {
                for (var j = 0; j < menu[i].sub_menu.length; j++) {
                    if (menu[i].sub_menu[j].sub_menu.length == 0) {
                        // var result = false;
                        // roles.forEach(role => {
                        //     if (role.key == menu[i].sub_menu[j].key) {
                        //         result = true;
                        //     }
                        // });

                        // if (result) {
                        //     menu[i].display = true;
                        //     menu[i].sub_menu[j].display = true;
                        // }
                        menu[i].display = true;
                        menu[i].sub_menu[j].display = true;
                    }
                    else {
                        for (var k = 0; k < menu[i].sub_menu[j].sub_menu.length; k++) {
                            if (menu[i].sub_menu[j].sub_menu[k].sub_menu.length == 0) {
                                menu[i].display = true;
                                menu[i].sub_menu[j].display = true;
                                menu[i].sub_menu[j].sub_menu[k].display = true;
                            }
                        }
                    }
                }
            }
        }
    }
}

export default withRouter(Home);
