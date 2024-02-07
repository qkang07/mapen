import { IRenderContext, IShapeStyle, EventType, Pixel } from './types';
import { MapenElement } from './Element';
import { MapenEvent } from './Event';
import { EventManager } from './Utils/eventManager';

export class Mapen extends MapenElement {
  h3HexagonStyle: IShapeStyle = {
    fillColor: 'rgba(0,44,222,.3)', // 多边形填充颜色
    strokeWeight: 0, // 线条宽度，默认为 1
    // strokeColor: 'rgba(0,44,222,.3)', // 线条颜色
    strokeColor: 'rgba(0,44,222,0)', // 线条颜色
  };
  ready: -1 | 0 | 1 = 0;

  private renderFlag: boolean = false;

  canvas?: HTMLCanvasElement;

  // 当发生交互事件时，置为true，之后触发一次渲染，并在渲染时触发事件处理
  canvasEvent: MouseEvent = null;

  eventEmptyManager: EventManager<MapenEvent> = new EventManager();

  // 事件相关
  mouseDown: boolean = false;
  mouseDownTime: number = null;

  extraData: any = {};

  constructor(el?: HTMLCanvasElement) {
    super();
    this.mapen = this;
    if (el) {
      this.init(el);
    }
  }

  async init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    ['click', 'dblclick', 'mousemove'].forEach((ename: EventType) => {
      canvas.addEventListener(ename, (event: MouseEvent) => {
        let dur = Date.now() - this.mouseDownTime;
        if (ename === 'click' && dur > 300) {
          return;
        }
        // 鼠标按下时不响应事件
        if (this.mouseDown) {
          return;
        }

        const pixel: Pixel = [event.offsetX, event.offsetY];
        const mapEvent = MapenEvent.create(event, pixel);
        let flag = false;
        this.eachChildren(ele => {
          if (ele.trigger(ename, mapEvent)) {
            flag = true;
            return false;
          }
        }, true);
        if (!flag) {
          this.eventEmptyManager.trigger(ename, mapEvent);
        }
      });
    });
    canvas.addEventListener('mousedown', ev => {
      this.mouseDownTime = Date.now();
      this.mouseDown = true;
    });
    canvas.addEventListener('mouseup', ev => {
      this.mouseDown = false;
    });
  }

  async render() {
    this.renderFlag = true;
    setTimeout(() => {
      if (this.renderFlag) {
        this.renderFlag = false;
      }
    });
  }
}
