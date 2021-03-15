import React from 'react'
import './Sidebar.css'
import ChatSvg from './ChatSvg'
import ChartSvg from './ChartSvg'
import MoreSvg from './MoreSvg'
import SearchSvg from './SearchSvg'
import AttachSvg from './AttachSvg'
import {IconButton, Avatar} from '@material-ui/core'
import SidebarChat from './SidebarChat'


function Sidebar() {
    return (
        <div className='sidebar'>
        <div className="sidebar-header">
        <Avatar className="SvgIcon" src="https://i.ibb.co/kDqX8Yn/me.png" />
   
       
            <div className="sidebar-headerRight">
                 
        <IconButton>
        <ChartSvg className="SvgIcon" style={{width: 24}}/>
        </IconButton>
        <IconButton >
        <ChatSvg className="SvgIcon" style={{width: 24}}/>
        </IconButton>
        <IconButton>
            <MoreSvg className="SvgIcon" style={{width: 24}}/>
        </IconButton>
            </div>
        </div> 
        <div className="sidebar-search">
            <div className="search-container">
                <SearchSvg className="SvgIcon" style={{width: 24}}/>
                <input type="text" placeholder="Search or start new chat"/>
            </div>
        </div> 
        <div className="sidebar-chats">
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
        </div>
        </div>
    )
}

export default Sidebar
