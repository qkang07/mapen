import { nanoid } from 'nanoid';
import { Mapen } from './Mapen';
import {
  IShapeStyle,
  Bounds,
  LngLat,
  IRenderContext,
  ITile,
  ElementType,
  Pixel,
} from '..';
import { isShape, zoomLevels } from './Utils';
import { SortedMap } from './Utils/sortedMap';
import { MapenEvent } from './Event';
import { EventManager } from './Utils/eventManager';

class RankLayer {
  zIndex: number;
  elements: { [key: string]: MapenElement } = {};
  constructor(zIndex) {
    this.zIndex = zIndex;
  }
}

export abstract class MapenElement {
  id: string = nanoid();
  name?: string;

  private childrenCollection: SortedMap<RankLayer> = new SortedMap();
  private zIndex: number = 0;

  parent: MapenElement;
  type: ElementType;

  protected eventManager: EventManager<MapenEvent> = new EventManager();

  listeners: Map<string, ((ev: MapenEvent) => any)[]> = new Map();
  visible: boolean = true;

  tiles: ITile[] = [];

  dataset: any = {};
  mapen: Mapen;
  style: IShapeStyle = {
    strokeColor: 'transparent',
    strokeWidth: 1,
  };

  bounds: Bounds;

  constructor() {}

  async render(rctx: IRenderContext): Promise<ImageBitmap | void> {
    let renderStyle: IShapeStyle = JSON.parse(JSON.stringify(this.style));
    if (this.style.fillImage) {
      renderStyle.fillImage.imgData = this.style.fillImage.imgData;
    }
    if (this.beforeRender) {
      if (this.beforeRender(renderStyle) === false) {
        return;
      }
    }

    if (this.customRender) {
      this.customRender(rctx, renderStyle);
    }
    return null;
  }

  beforeRender: (style: IShapeStyle) => any;

  abstract contain(pos: Pixel): boolean;
  protected customRender?(rctx: IRenderContext, renderStyle: IShapeStyle): any;
  protected abstract makeBounds(): Bounds;


  addChildren(el: MapenElement) {
    el.parent = this;
    el.mapen = this.mapen;
    let layer = this.childrenCollection.get(el.zIndex);
    if (!layer) {
      layer = new RankLayer(el.zIndex);
      this.childrenCollection.set(el.zIndex, layer);
    }
    layer.elements[el.id] = el;
    if (this.mapen) {
      this.mapen.render();
    }
  }
  setChildren(els: MapenElement[]) {
    this.childrenCollection.forEach(l => {
      l.elements = {};
    });
    els.forEach(ele => {
      this.addChildren(ele);
    });
  }
  clear(repaint: boolean = true) {
    this.childrenCollection.forEach(l => {
      l.elements = {};
    });
    if (this.mapen && repaint) {
      this.mapen.render();
    }
  }
  setZIndex(zIndex: number) {
    if (this.parent) {
      let originCollection = this.parent.childrenCollection.get(this.zIndex);
      if (originCollection) {
        delete originCollection.elements[this.id];
      }
      this.zIndex = zIndex;
      let newCollection = this.parent.childrenCollection.get(this.zIndex);
      if (!newCollection) {
        newCollection = new RankLayer(zIndex);
        this.parent.childrenCollection.set(zIndex, newCollection);
      }
      newCollection.elements[this.id] = this;
    }
  }
  getZIndex() {
    return this.zIndex;
  }

  setMapen(mapen: Mapen) {
    this.mapen = mapen;
    mapen.render();
  }

  eachChildren(cb: (item: MapenElement) => boolean | void, reverse?: boolean) {
    this.childrenCollection.forEach(layer => {
      let keys = Object.keys(layer.elements);
      for (let key of keys) {
        let flag = cb(layer.elements[key]);
        if (flag === false) {
          return false;
        }
      }
    }, reverse);
  }

  on(eventName: string, handler: (ev: MapenEvent) => any) {
    this.eventManager.on(eventName, handler);
  }
  off(eventName: string, handler?: (ev: MapenEvent) => any) {
    this.eventManager.off(eventName, handler);
  }
  trigger(eventName: string, ev: MapenEvent) {
    const triggerSelf = () => {
      return this.eventManager.trigger(eventName, ev, ev => {
        ev.element = this;
      });
    };
    // 如果是layer节点，先看子节点有没有触发事件
    if (this.type === 'layer') {
      let triggerFlag = false;
      this.eachChildren(c => {
        if (c.trigger(eventName, ev)) {
          triggerFlag = true;
          return false;
        }
      }, true);
      if (triggerFlag) {
        triggerSelf();
        return true;
      }
    } else if (this.contain({ x: ev.offsetX, y: ev.offsetY })) {
      return triggerSelf();
    }
    return false;
  }
}
