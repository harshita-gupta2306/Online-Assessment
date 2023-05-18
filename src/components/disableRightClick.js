import React from 'react';

class DisableRightClickPage extends React.Component {
  handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default right-click behavior
  };

  componentDidMount() {
    document.addEventListener('contextmenu', this.handleContextMenu); // Add the event listener when the component mounts
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleContextMenu); // Remove the event listener when the component unmounts
  }

  render() {
    return (
      <div>
        {/* Your page content goes here */}
      </div>
    );
  }
}

export default DisableRightClickPage;
