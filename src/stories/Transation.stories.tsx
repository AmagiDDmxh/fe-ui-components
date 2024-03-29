import React, { useCallback, useState, useEffect, useMemo, FC } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import cx from "classnames";
import {
  Card,
  Account,
  Tooltip,
  Button,
  Switch,
  Icon,
  Tabs,
  Input,
  Checkbox,
  Modal,
  Token,
  TextArea,
  TransactionList as TransactionListComponent,
} from "../components";
import _ from "lodash";
const { TabList, TabItem, TabPanels, TabPanel } = Tabs;
const { Body } = Card;

export default {
  title: "UI/TransactionList",
  component: TransactionListComponent,
} as ComponentMeta<typeof TransactionListComponent>;

const Template: ComponentStory<typeof TransactionListComponent> = (args) => (
  <Card className="okd-overflow-hidden okd-w-80">
    <div className="okd--m-4 sm:okd--m-6">
      <TransactionListComponent {...args}></TransactionListComponent>
    </div>
  </Card>
);

export const Default = Template.bind({});

Default.args = {
  dataSource: [
    {
      label: "QUEUE",
      lists: [
        {
          label: "Send",
          address: null,
          direction: 0,
          status: 1,
          value: "-0.5",
          symbol: "ETH",
          timestamp: "15:03·Sep",
        },
      ],
    },
    {
      label: "September",
      lists: [
        {
          label: "Send",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 0,
          value: "-0.5",
          symbol: "ETH",
          timestamp: "15:03·Sep",
        },
        {
          label: "Send",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 2,
          value: "-0.5",
          symbol: "ETH",
          timestamp: "15:03·Sep",
        },
        {
          label: "Send",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 3,
          value: "-0.5",
          symbol: "ETH",
          timestamp: "15:03·Sep",
        },
        {
          label: "Send",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 0,
          value: "-0.5",
          symbol: "ETH",
          timestamp: "15:03·Sep",
        },
      ],
    },
  ],
};

export const AccountList = Template.bind({});

AccountList.args = {
  dataSource: [
    {
      label: "solana",
      lists: [
        {
          label: "OkeKey",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 1,
          value: "-0.5",
          symbol: "ETH",
          timestamp: "15:03·Sep",
        },
      ],
    },
    {
      label: "bsc",
      lists: [
        {
          label: "Account2",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 0,
          value: "-0.5",
          symbol: "ETH",
          timestamp: "15:03·Sep",
        },
        {
          label: "Account3",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 2,
          value: "-0.5",
          symbol: "ETH",
          timestamp: "15:03·Sep",
        },
        {
          label: "Account5",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 3,
          value: "-0.5",
          symbol: "ETH",
          timestamp: "15:03·Sep",
        },
        {
          label: "Account6",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 0,
          value: "-0.5",
          symbol: "ETH",
          timestamp: "15:03·Sep",
        },
      ],
    },
  ],
  renderLabel: (label, len) => {
    return (
      <div
        key={label}
        className="okd-flex okd-items-center okd-text-gray-400 okd-py-2 okd-px-4 okd-text-sm okd-leading-4"
      >
        {`${label}(${len})`}
        <Tooltip place="bottom" content="chain">
          <Icon name="PresentationChartBarOutline" size={14}></Icon>
        </Tooltip>
      </div>
    );
  },
  renderItem: (item, idx, len) => {
    return (
      <div
        key={`item-${idx}`}
        className={cx({
          "okd-border-b okd-border-gray-50 okd-border-solid": idx !== len - 1,
        })}
      >
        <Account label={item.label} address={item.address}></Account>
      </div>
    );
  },
  listPanelClass: "okd-pl-0",
};

// Manage Tokens

const Tokens: ComponentStory<typeof TransactionListComponent> = (args) => {
  const [addDisable, setAddDisable] = useState(true);
  const [address, setAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimal, setDecimal] = useState("6");
  const searchHandle = useCallback((value) => {
    setTimeout(() => {
      console.log("fetch data: ");
    }, 1000);
  }, []);

  const addressChange = useCallback((val) => {
    setAddress(val);
    // TODO 校验合约地址有效性
  }, []);
  const symbolChange = useCallback((val) => {
    setSymbol(val);
  }, []);
  const decimalChange = useCallback((val) => {
    setDecimal(val);
  }, []);

  useEffect(() => {
    if (address && symbol && decimal) {
      setAddDisable(false);
      return;
    }
    setAddDisable(true);
  }, [address, symbol, decimal]);

  return (
    <Card title="Manage Tokens" className="okd-overflow-hidden okd-w-96">
      <Body className="okd-p-0">
        <Tabs defaultIndex={0}>
          {(props) => {
            return (
              <>
                <TabList fitted={true}>
                  <TabItem fitted={true}>Search</TabItem>
                  <TabItem fitted={true}>Custom</TabItem>
                </TabList>
                <div className="okd-h-122 okd-bg-gray-50 okd-overflow-y-auto">
                  <TabPanels className="okd-h-full">
                    <TabPanel className="okd-h-full">
                      <div className="okd-p-4 okd-bg-gray-50">
                        <Input
                          onChange={_.debounce(searchHandle, 700)}
                          placeholder="Search Tokens"
                          addonBefore={
                            <Icon
                              name="SearchOutline"
                              size={20}
                              className="okd-text-gray-400"
                            />
                          }
                        />
                      </div>
                      <div>
                        <TransactionListComponent
                          {...args}
                        ></TransactionListComponent>
                      </div>
                    </TabPanel>
                    <TabPanel className="okd-h-full">
                      <div className="okd-h-full okd-flex okd-flex-col okd-justify-between">
                        <div className="okd-space-y-5 okd-pt-5 okd-px-4">
                          <TextArea
                            label="CONTRACT ADDRESS"
                            maxLength={100}
                            value={address}
                            onChange={addressChange}
                            rule={{
                              required: true,
                              message: "必填项",
                              pattern: new RegExp(/^[a-zA-Z0-9]+$/),
                            }}
                          />
                          <Input
                            label="TOKEN SYMBOL"
                            value={symbol}
                            maxLength={15}
                            onChange={symbolChange}
                            rule={{
                              required: true,
                              message: "必填项",
                              pattern: new RegExp(
                                /^[a-zA-Z0-9]+\(?[a-zA-Z0-9]?\)?$/
                              ),
                            }}
                          />
                          <Input
                            label="DECIMAL"
                            value={decimal}
                            maxLength={5}
                            onChange={decimalChange}
                            rule={{
                              required: true,
                              message: "必填项",
                              pattern: new RegExp(/^[0-9]+$/),
                            }}
                          />
                        </div>
                        <div className="okd-flex okd-items-center okd-p-4 okd-space-x-3 okd-bg-white okd-border-t okd-border-solid okd-border-gray-200">
                          <Button className="okd-flex-1" onClick={() => {}}>
                            Cancel
                          </Button>
                          <Button
                            className="okd-flex-1"
                            type="primary"
                            onClick={() => {}}
                            disabled={addDisable}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </div>
              </>
            );
          }}
        </Tabs>
      </Body>
    </Card>
  );
};

export const ManageTokens = Tokens.bind({});

ManageTokens.args = {
  dataSource: [
    {
      label: "my tokens",
      lists: [
        {
          label: "USDT-0xa3C6cA435B784-0xa3C6cA435B784",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 1,
          value: "0.5",
          symbol: "USDT",
          name: "USDT",
          timestamp: "15:03·Sep",
        },
      ],
    },
    {
      label: "Top 50 tokens",
      lists: [
        {
          label: "BNB",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4552",
          direction: 0,
          status: 0,
          value: "0.5",
          symbol: "BNB",
          name: "BNB",
          timestamp: "15:03·Sep",
        },
        {
          label: "ETH",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4553",
          direction: 0,
          status: 2,
          value: "0.5",
          symbol: "ETH",
          name: "ETH",
          timestamp: "15:03·Sep",
        },
        {
          label: "BTC",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4554",
          direction: 0,
          status: 3,
          value: "0.5",
          symbol: "BTC",
          name: "BTC",
          timestamp: "15:03·Sep",
        },
        {
          label: "CTT",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4555",
          direction: 0,
          status: 0,
          value: "0.5",
          symbol: "CTT",
          name: "CTT",
          timestamp: "15:03·Sep",
        },
        {
          label: "USDT",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 1,
          added: true,
          value: "0.5",
          symbol: "USDT",
          name: "USDT",
          timestamp: "15:03·Sep",
        },
      ],
    },
  ],
  renderItem: (item, idx, len, label) => {
    const addToken = (token) => {
      console.log("addToken: ", token);
    };

    const toggleToken = (token) => {
      console.log("toggleToken: ", token);
      // token = {
      //   status: !token.status,
      //   ...token,
      // };
      token.status = !token.status;
      // setTokens
    };

    const actionSwitch = (token) => {
      return (
        <Switch
          value={!token.status}
          onChange={() => toggleToken(token)}
        ></Switch>
      );
    };

    const actionAdd = (token) => {
      return (
        <>
          {token.added ? (
            <Button className="okd-text-brand-500" type="plain" disabled={true}>
              ADDED
            </Button>
          ) : (
            <Button
              className="okd-text-brand-500"
              type="plain"
              onClick={() => addToken(token)}
            >
              ADD
            </Button>
          )}
        </>
      );
    };

    return (
      <div
        key={`item-${idx}`}
        className={cx({
          "okd-border-b okd-border-gray-50 okd-border-solid": idx !== len - 1,
        })}
      >
        {!!label && label.toLowerCase() === "my tokens" ? (
          <Account
            label={item.label}
            value={item.value}
            symbol={item.symbol}
            address={item.address}
            action={actionSwitch(item)}
          ></Account>
        ) : (
          <Account
            label={item.label}
            address={item.address}
            action={actionAdd(item)}
          ></Account>
        )}
      </div>
    );
  },
  listPanelClass: "okd-pl-0",
};

const SelectAccountTpl: ComponentStory<typeof TransactionListComponent> = (
  args
) => {
  const [indeterminateVal, setIndeterminate] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [accountList, setAccountList] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      const lists = [
        {
          label: "Main(...5wgY)",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4551",
          direction: 0,
          status: 0,
          value: "0.56",
          symbol: "BNB",
          name: "BNB",
          checked: false,
          timestamp: "15:03·Sep",
        },
        {
          label: "Account1(...7wga)",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4552",
          direction: 0,
          status: 2,
          value: "0.5",
          symbol: "ETH",
          name: "ETH",
          checked: false,
          timestamp: "15:03·Sep",
        },
        {
          label: "Account2(...3agH)",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4553",
          direction: 0,
          status: 3,
          value: "0.5",
          symbol: "BTC",
          name: "BTC",
          checked: false,
          timestamp: "15:03·Sep",
        },
        {
          label: "Account3(...9wgT)",
          address: "0xa3C6cA435B784ab686987Fe0850f7B75388b4554",
          direction: 0,
          status: 0,
          value: "0.5",
          symbol: "CTT",
          name: "CTT",
          checked: false,
          timestamp: "15:03·Sep",
        },
      ];
      setAccountList(lists);
    }, 1000);
  }, []);

  useEffect(() => {
    const curSelected = accountList.filter((account) => {
      return account.checked;
    });
    const curIndeterminateVal =
      curSelected?.length > 0 && curSelected?.length !== accountList.length;
    setIndeterminate(curIndeterminateVal);
    setCheckedAll(curSelected?.length === accountList?.length);
  }, [accountList]);

  const toggleCheckAll = useCallback(
    (checked) => {
      const curList = accountList.map((account) => {
        account.checked = checked;
        return account;
      });
      setAccountList(curList);
    },
    [accountList]
  );

  const accountListArgs = useMemo(() => {
    return {
      dataSource: [{ label: "My Etherseum Accounts", lists: [...accountList] }],
      renderItem: (item, idx, len, label) => {
        const toggleSelect = (curAccount) => (checked) => {
          const curList = accountList.map((account) => {
            if (account.address === curAccount.address) {
              account.checked = checked;
              return account;
            }
            return account;
          });
          setAccountList(curList);
        };

        const actionCheckbox = (account) => {
          return (
            <Checkbox
              id={account.adderss}
              checked={account.checked}
              onChange={toggleSelect(account)}
            ></Checkbox>
          );
        };

        return (
          <div
            key={`item-${idx}`}
            className={cx({
              "okd-border-b okd-border-gray-50 okd-border-solid":
                idx !== len - 1,
            })}
          >
            <Account
              label={item.label}
              address={item.address}
              action={actionCheckbox(item)}
              className="okd-pr-8"
            ></Account>
          </div>
        );
      },
      listPanelClass: "okd-pl-0",
    };
  }, [accountList]);

  return (
    <div className="okd-w-96 okd-px-3">
      <div className="okd-flex okd-justify-between okd-items-center okd-pl-2 okd-pr-8 okd-py-2">
        <p className="okd-text-xs okd-font-bold okd-text-gray-600">
          SELECT ACCOUNT(s)
        </p>
        <Checkbox
          id="selectAccounts"
          checked={checkedAll}
          indeterminate={indeterminateVal}
          onChange={toggleCheckAll}
        ></Checkbox>
      </div>
      <Card className="okd-overflow-hidden okd-w-full">
        <Body className="okd-p-0">
          <TransactionListComponent
            {...accountListArgs}
          ></TransactionListComponent>
        </Body>
      </Card>
      <div className="okd-py-2 okd-text-brand-500">
        <Button
          type="plain"
          // leadingIcon="PlusOutline"
          className="okd-text-brand-500 okd-text-sm okd-font-bold okd-pl-0"
        >
          <Icon
            size={14}
            name="PlusOutline"
            className="okd-text-brand-500 okd-font-bold okd-mr-1"
          ></Icon>
          ADD ACCOUNT
        </Button>
      </div>
    </div>
  );
};

export const SelectAccounts = SelectAccountTpl.bind({});

// Add Token
const defaulToken = {
  address: "0xa3C6cA435B784ab686987Fe0850f7B75388b45516w0xa3C6454",
  logoUrl:
    "https://onekey-asset.com/assets/bsc/0x55d398326f99059ff775485246999027b3197955.png",
  status: 1,
  decimal: 18,
  balance: "0.5",
  symbol: "USDT",
  name: "USDT Coin",
  timestamp: "15:03·Sep",
};

interface TokenItemProps {
  label: string;
  value: string | number;
  className?: string;
}
const TokenItem: FC<TokenItemProps> = ({ label, value, className }) => {
  return (
    <div
      className={cx(
        "okd-py-2 okd-flex okd-items-center okd-justify-between okd-font-medium okd-text-sm okd-border-b okd-border-solid okd-border-gray-200",
        className
      )}
    >
      <p className="okd-text-gray-400 okd-flex-shrink-0">{label}</p>
      <p className="okd-text-gray-900 okd-ml-2 okd-break-all okd-text-right">
        {value}
      </p>
    </div>
  );
};
interface TokenProps {
  name: string;
  symbol?: string;
  address: string;
  decimal: number;
  balance: string;
  logoUrl: string;
}

const TokenPanel: FC<TokenProps> = ({
  name,
  symbol,
  address,
  decimal,
  balance,
  logoUrl,
}) => {
  return (
    <div className="okd-bg-gray-50 okd-py-8">
      <div className="okd-bg-gray-50 okd-pb-8 okd-text-center">
        <Token src={logoUrl}></Token>
        <p className="okd-text-xl okd-font-bold okd-text-gray-900 okd-mt-1">
          {`${name}(${symbol})`}
        </p>
      </div>
      <div className="okd-bg-white okd-border okd-border-solid okd-border-gray-200 okd-px-4">
        <TokenItem label="Name" value={name} />
        <TokenItem label="Symbol" value={symbol} />
        <TokenItem label="Contract" value={address} />
        <TokenItem label="Decimal" value={decimal} />
        <TokenItem
          label="Balance"
          value={balance}
          className="okd-border-none"
        />
      </div>
    </div>
  );
};

const TokenDetailTpl: ComponentStory<typeof Modal> = (args) => {
  const [modalVisible, setModalVisible] = useState(true);
  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);
  const handleAdd = useCallback(() => {
    console.log("handleNext: ");
  }, []);
  const modalTitle = useMemo(() => {
    return (
      <div className="okd-flex okd-items-center okd-justify-between">
        <div className="okd-inline-flex okd-items-center">
          <Icon name="PlusCircleSolid" size={16}></Icon>
          <p className="okd-ml-2 okd-text-base okd-leading-5 okd-font-bold okd-text-gray-900">
            Add Token
          </p>
        </div>
      </div>
    );
  }, []);

  return (
    <Modal
      className="okd-w-96"
      visible={modalVisible}
      onClose={handleCloseModal}
    >
      <Modal.Header title={modalTitle} onClose={handleCloseModal} />
      <Modal.Body className="okd-p-0 sm:okd-p-0">
        <TokenPanel {...defaulToken}></TokenPanel>
      </Modal.Body>
      <Modal.Footer>
        <div className="okd-flex okd-space-x-3">
          <Button className="okd-flex-1" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button className="okd-flex-1" type="primary" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export const TokenDetail = TokenDetailTpl.bind({});

// token管理 sol top50 token 添加 modal
interface FootActionProps {
  cancelText: string;
  handleCancel: () => void;
  okText: string;
  handleOk: () => void;
}

const FootAction: FC<FootActionProps> = ({
  cancelText,
  handleCancel,
  okText,
  handleOk,
}) => {
  return (
    <div className="okd-flex okd-space-x-3">
      <Button className="okd-flex-1" onClick={handleCancel}>
        {cancelText}
      </Button>
      <Button className="okd-flex-1" type="primary" onClick={handleOk}>
        {okText}
      </Button>
    </div>
  );
};

const SolTokenAddModalTpl: ComponentStory<typeof Modal> = (args) => {
  const [modalVisible, setModalVisible] = useState(true);
  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);
  const handlePay = useCallback(() => {
    console.log("handlePay: pay sol chain add token fee");
  }, []);
  const fee = 0.00203928;
  const symbol = "SXP";

  return (
    <Modal
      className="okd-w-80"
      visible={modalVisible}
      onClose={handleCloseModal}
    >
      <Modal.Body className="okd-p-4">
        <div className="okd-text-center okd-pb-6">
          <Token
            src="https://onekey-asset.com/assets/bsc/0x55d398326f99059ff775485246999027b3197955.png"
            size={48}
          ></Token>
          <p className="okd-text-xl okd-font-bold okd-text-gray-900 okd-mt-4">
            Transaction Confirm
          </p>
          <p className="okd-text-sm okd-font-medium okd-text-gray-500 okd-mt-2">
            {`Pay ${fee} SOL to add ${symbol} token.`}
          </p>
        </div>
        <FootAction
          cancelText="Cancel"
          handleCancel={handleCloseModal}
          okText="Pay"
          handleOk={handlePay}
        />
      </Modal.Body>
    </Modal>
  );
};

export const SolTokenAddModal = SolTokenAddModalTpl.bind({});
