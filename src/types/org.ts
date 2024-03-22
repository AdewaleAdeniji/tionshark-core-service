export type IOrg = {
    orgName: string;
    orgIndustry: string;
    orgID: string;
    orgActive?: boolean;
    orgStatus?: string;
    orgProEnabled?: boolean;
    orgAdmins?: string[];
    orgMeta: any;
}
export type ICreateOrg = {
    orgName: string;
    orgIndustry: string;
    orgID: string;
    orgActive?: boolean;
    orgStatus?: string;
    orgProEnabled?: boolean;
    orgAdmins?: string[];
    orgMeta?: any;
}

export type IOrgUser = {
    orgID: string;
    orgUserID: string;
    userID: string;
    userRole?: string;
    userStatus?: string;
    userNames?: string;
    userEmail?: string;
    userActive?: boolean;
    userEnabled?: boolean;
    userMeta?: any;
}