import { Route } from "../datamodels/route";
import HomeIcon from '@mui/icons-material/Home';
import GamepadIcon from '@mui/icons-material/Gamepad';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';

const routes: Array<Route> = [
    {
        key: 'router-home',
        title: 'Home',
        description: 'Home page',
        // component: Home,
        isEnabled: true,
        path: '/home',
        icon: HomeIcon,
        appendDivider: true,
    },
    {
        key: 'router-playgame',
        title: 'Play Game',
        description: 'Play Game',
        // component: PlayGame,
        isEnabled: true,
        path: '/game',
        icon: GamepadIcon,
    },
    {
        key: 'router-social',
        title: 'Social',
        description: 'Social',
        isEnabled: false,
        path: '/social',
        icon: GroupIcon,
        subRoutes: [
            {
                key: 'router-chat',
                title: 'Chat',
                description: 'Chat page',
                // component: Chat,
                isEnabled: true,
                path: '/social/chat',
                icon: ChatIcon,
            },
            {
                key: 'router-leaderboard',
                title: 'Leaderboard',
                description: 'The top players',
                // component: Leaderboard,
                isEnabled: true,
                path: '/social/leaderboard',
                icon: EqualizerIcon,
            },
        ]
    },
    {
        key: 'router-account',
        title: 'Account',
        description: 'Account',
        isEnabled: false,
        path: '/user',
        icon: AccountCircleIcon,
        subRoutes: [
            {
                key: 'router-profile',
                title: 'My profile',
                description: 'My profile',
                // component: Profile,
                isEnabled: true,
                path: '/user/profile',
                icon: AccountCircleIcon,
            },

            {
                key: 'router-settings',
                title: 'Setting',
                description: 'Settings',
                // component: Settings,
                isEnabled: true,
                path: '/user/settings',
                icon: SettingsIcon,
            },
            {
                key: 'router-twofact',
                title: 'Two Factor',
                description: 'Activate or Deactivate the 2FA',
                // component: TwoFactor,
                isEnabled: true,
                path: '/user/twofactor',
                icon: LockIcon,
            },
        ]
    },
];

export default routes;