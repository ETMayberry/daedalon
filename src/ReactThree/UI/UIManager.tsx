import * as React from 'react';

/* tslint:disable */

export default class UIManager extends React.Component<{}, IPositionStyle> {

    elref: any;
    visible: boolean = true;

    constructor(props: any) {
        super(props);
        this.state = {
            left: "0px",
            top: "0px"
        }
        this.onClick = this.onClick.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.elref = React.createRef();
    }

    render() {
        return <div className="card bg-dark text-light position-absolute"
            style={this.state}
            draggable
            onDragStart={this.onDragStart}
            ref={this.elref}>

            <div className="card-header text-center">
                Menu
                <span className="float-right">X</span>
            </div>

            <div className="card-body">
                <form>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="cbox" />
                            <label className="form-check-label">Visible</label>
                        </div>
                    </div>
                </form>
                <button className="btn btn-outline-info" onClick={this.onClick}>Success!</button>
            </div>
        </div>
    }

    // shouldComponentUpdate(nextProps: any, nextState: any) {
    //     // tslint:disable-next-line:no-console
    //     console.log('shouldComponentUpdate');
    //     // We usually want to prevent updates because it's costly to rebuild the Three.js scene.
    //     // Alternatively, we can simply push updates into the SceneManager and let it update 
    //     // it's own objects as needed.
    //     return false;
    // }

    _isDragging: boolean = false;
    _dragData: { x: number, y: number } = { x: 0, y: 0 };
    _dragStyle: any;
    onClick(e: any) {
        console.log('Success!!!');
    }

    onDragStart(e: any) {
        this._dragData = {
            x: e.clientX - this.elref.current.offsetLeft,
            y: e.clientY - this.elref.current.offsetTop
        }
        this._dragStyle = e.target.style;
        e.preventDefault();
        document.body.addEventListener('pointermove', this.onDragOver);
        document.body.addEventListener('pointerup', this.onDragEnd);
    }

    onDragOver(e: any) {
        const deltas = {
            x: e.clientX - this._dragData.x,
            y: e.clientY - this._dragData.y
        }
        this.setState({
            left: `${deltas.x}px`,
            top: `${deltas.y}px`
        });
    }

    onDragEnd(e: any) {
        document.body.removeEventListener('pointermove', this.onDragOver);
        document.body.removeEventListener('pointerup', this.onDragEnd);
    }

}

interface IPositionStyle {
    top: string,
    left: string
}