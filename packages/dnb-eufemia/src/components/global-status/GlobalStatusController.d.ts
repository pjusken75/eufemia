import * as React from 'react';

export interface GlobalStatusControllerProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * The main ID. Defaults to `main`.
   */
  id?: string;
  status_id?: string;
  remove_on_unmount?: boolean;
}
export default class GlobalStatusController extends React.Component<
  GlobalStatusControllerProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}

export interface GlobalStatusRemoveProps {
  /**
   * The main ID. Defaults to `main`.
   */
  id?: string;
  status_id: string;
}
export class GlobalStatusRemove extends React.Component<
  GlobalStatusRemoveProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}