

    export interface Authority {
        authority: string;
    }

    export interface Authority2 {
        authority: string;
    }

    export interface Principal {
        password?: any;
        username: string;
        authorities: Authority2[];
        accountNonExpired: boolean;
        accountNonLocked: boolean;
        credentialsNonExpired: boolean;
        enabled: boolean;
    }

    export interface Authentication {
        authorities: Authority[];
        details?: any;
        authenticated: boolean;
        principal: Principal;
        credentials?: any;
        name: string;
    }

    export interface LoginResponseDto {
        authentication: Authentication;
        token: string;
    }



