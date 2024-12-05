export const useIsLoggedInUser = () => useState('is-logged-in-user', () => false);

export const useIsLoading = () => useState('is-loading', () => true);

export const useIsPageLoading = () => useState('is-page-loading', () => true);

export const useNavBarLinks = () => useState('nav-bar-links', () => defaultNavLink);