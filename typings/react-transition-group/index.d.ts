// import * as React from 'react';

declare module 'react-transition-group' {
    import * as React from 'react';

    interface ICSSTransitionGroupProps {
        component: string;
        className: string;
        transitionName: string;
        transitionEnterTimeout: number;
        transitionLeaveTimeout: number;
    }

    type CSSTransitionGroup = React.Component<ICSSTransitionGroupProps, any>;
    var CSSTransitionGroup: React.ComponentClass<ICSSTransitionGroupProps>;

}

