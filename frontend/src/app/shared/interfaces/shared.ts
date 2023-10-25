export interface InfoDb {
    db_host: string,
    db_user: string,
    db_pass: string,
    db_name: string,
}

export interface InfoSys {
    sys_version: string,
    sys_name: string,
    sys_title: string,
    sys_desc: string,
    sys_domain: string,
    sys_logo: string
}

export interface InfoAddr {
    addr_street: string | null,
    addr_number: string | null,
    addr_complement: string | null,
    addr_city: string | null,
    addr_state: string | null,
    addr_zipcode: string | null,
}

export interface SocialTwitter {
    tt_creator: string | null,
    tt_publish: string | null,
}

export interface SocialFacebook {
    fb_app: string | null,
    fb_page: string | null,
    fb_author: string | null,
}

export interface SocialGoolge {
    gg_page: string | null,
    gg_author: string | null,
}

export interface TimeConnection {
    tc_limit: string,
    tc_warning: string,
    tc_refresh: string,
}

export interface menuItem {
    id: string,
    icon: string,
    label: string,
    submenu?: Array<subMenuItem>
}

export interface subMenuItem {
    label: string,
    route: string
}

export interface breadcrumbItem {
    label: string,
    route: string
}