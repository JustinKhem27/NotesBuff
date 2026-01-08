import React from 'react';
import './SideBar.css';

const SideBar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Previous Notes</h3>
      </div>
      <ul className="sidebar-list">
        <li><a href="/note/1">Note 1</a></li>
        <li><a href="/note/2">Note 2</a></li>
        <li><a href="/note/3">Note 3</a></li>
      </ul>
    </aside>
  );
};

export default SideBar;
