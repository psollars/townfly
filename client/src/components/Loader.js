import React, { Component } from 'react';

class Loader extends Component {
  render() {
    if (!this.props.loading){
        return null;
    } else {
        return (
            <div className="Loader">
                <div className="sequence"> 
                    <div className="seq-preloader"> 
                        <svg width="39" height="16" viewBox="0 0 39 16" xmlns="http://www.w3.org/2000/svg" className="seq-preload-indicator"><title>Sequence Preloader Icon</title><desc>Three orange dots increasing in size from left to right</desc><g fill="#F96D38"><path className="seq-preload-circle seq-preload-circle-1" d="M3.999 12.012c2.209 0 3.999-1.791 3.999-3.999s-1.79-3.999-3.999-3.999-3.999 1.791-3.999 3.999 1.79 3.999 3.999 3.999z"/><path className="seq-preload-circle seq-preload-circle-2" d="M15.996 13.468c3.018 0 5.465-2.447 5.465-5.466 0-3.018-2.447-5.465-5.465-5.465-3.019 0-5.466 2.447-5.466 5.465 0 3.019 2.447 5.466 5.466 5.466z"/><path className="seq-preload-circle seq-preload-circle-3" d="M31.322 15.334c4.049 0 7.332-3.282 7.332-7.332 0-4.049-3.282-7.332-7.332-7.332s-7.332 3.283-7.332 7.332c0 4.05 3.283 7.332 7.332 7.332z"/></g></svg>
                    </div>
                </div>
            </div>
        );
    }
  }
}

export default Loader;








                    















