import React from "react";
import Router from "next/router";
import {LocalStorageEnum} from "../../lib/enum/local-storage.enum";

export const withOutAuthentication = <T extends object>(Component: (props) => (JSX.Element)) => {
    return class AuthComponent extends React.Component<T> {
        componentDidMount() {
            const token = localStorage.getItem(LocalStorageEnum.LOGGED)
            if (token) {
                Router.replace('/dashboard');
            }
        }

        render() {
            return <Component {...this.props} />;
        }
    };
};
