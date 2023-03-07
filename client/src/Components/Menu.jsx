// import 순서 1-3 순서 참고
import { Tooltip } from 'antd'; // 1 .antd
import { FilterOutlined } from '@ant-design/icons'; // 2. @ant-design/icons
import { MenuButton } from '../Style/MenuStyle'; // 3. Compnents명Style.js

export default function Menu() {
  return (
    <div className="Menu">
      <Tooltip>
        <MenuButton shape="circle" icon={<FilterOutlined />} />
      </Tooltip>
    </div>
  );
}
