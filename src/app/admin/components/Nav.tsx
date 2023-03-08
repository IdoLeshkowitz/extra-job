'use client'
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import CardNav from '@/components/CardNav';
import {useState} from "react";
export default function Nav() {
    const [open,setOpen] = useState(false)
    const accountPageTitle = 'title'
    return (
        <>
            <Button
                variant='outline-light'
                className='d-block d-md-none w-100 mb-3'
                onClick={() => setOpen(!open)}
                aria-controls='account-menu'
                aria-expanded={open}
            >
                <i className='fi-align-justify me-2'></i>
                Menu
            </Button>
            <Collapse in={open} className='d-md-block'>
                <div id='account-menu'>
                    <CardNav className='pt-3'>
                        <CardNav.Item
                            href='/car-finder/account-info'
                            icon='fi-user'
                            // active={accountPageTitle === 'Personal Info' ? true : false}
                        >
                            Personal Info
                        </CardNav.Item>
                        <CardNav.Item
                            href='/car-finder/account-security'
                            icon='fi-lock'
                            // active={accountPageTitle === 'Password & Security' ? true : false}
                        >
                            Password &amp; Security
                        </CardNav.Item>
                        <CardNav.Item
                            href='/car-finder/account-cars'
                            icon='fi-car'
                            // active={accountPageTitle === 'My Cars' ? true : false}
                        >
                            My Cars
                        </CardNav.Item>
                        <CardNav.Item
                            href='/car-finder/account-wishlist'
                            icon='fi-heart'
                            // active={accountPageTitle === 'Wishlist' ? true : false}
                        >
                            Wishlist
                            <span className='badge bg-faded-light ms-2'>4</span>
                        </CardNav.Item>
                        <CardNav.Item
                            href='/car-finder/account-reviews'
                            icon='fi-star'
                            // active={accountPageTitle === 'Reviews' ? true : false}
                        >
                            Reviews
                        </CardNav.Item>
                        <CardNav.Item
                            href='/car-finder/account-notifications'
                            icon='fi-bell'
                            // active={accountPageTitle === 'Notifications' ? true : false}
                        >
                            Notifications
                        </CardNav.Item>
                        <CardNav.Item href='/car-finder/help-center' icon='fi-help'>
                            Help
                        </CardNav.Item>
                        <CardNav.Item href='/signin-dark' icon='fi-logout'>
                            Sign Out
                        </CardNav.Item>
                    </CardNav>
                </div>
            </Collapse>
        </>
    )
}
