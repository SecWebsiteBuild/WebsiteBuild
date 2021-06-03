import React from 'react'
import Fade from 'react-reveal/Fade';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './btn_style.css'

class CopyButton1Controller extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { show: false };
        this.handleClick = this.handleClick.bind(this);
      }

    handleClick(){
        this.setState({ show: !this.state.show });
        setTimeout(() => {  this.setState({ show: !this.state.show }); }, 1000);
    }

    render() {
        return (
        <div>
            <script src="https://kit.fontawesome.com/d97b87339f.js" crossorigin="anonymous"></script>
            <div class="clipboard">
                <input class="copy-input" value="0x9c061df134d11412151e9c200ce3f9f6f295094a" id="copyClipboard" readonly />
                    <CopyToClipboard text={'0x9c061df134d11412151e9c200ce3f9f6f295094a'}
                        onCopy={() => this.setState({copied: true})}>
                        <button class="copy-btn" id="copyButton" onClick={() => { this.handleClick() }}><i class="far fa-copy"></i></button>
                    </CopyToClipboard>
                <Fade bottom cascade when={this.state.show}>
                <div id="copied-success" class="copied">
                <span>Copied!</span>
                </div>
                </Fade>
            </div>
        </div>  
        )
    }
}
export default CopyButton1Controller;

