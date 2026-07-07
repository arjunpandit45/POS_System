import React from "react";
import { FaCheckDouble, FaCircle } from "react-icons/fa";
import { getAvatarName } from "../../utils";

const OrderList = ({ order }) => {
  return (
    <div className="flex items-center gap-4 mb-4">

      {/* Avatar */}
      <button className="bg-[#f6b100] w-12 h-12 rounded-lg text-base font-bold flex items-center justify-center flex-shrink-0">
        {getAvatarName(order.customerDetails.name)}
      </button>

      {/* Right Section */}
      <div className="flex items-center w-full">

        {/* Customer Details */}
        <div className="w-[220px]">
          <h1 className="text-[#f5f5f5] text-base font-semibold truncate">
            {order.customerDetails.name}
          </h1>

          <p className="text-[#ababab] text-sm mt-1">
            {order.items.length} Items
          </p>
        </div>

        {/* Table Number */}
        <div className="ml-14">
          <span className="border border-[#f6b100] text-[#f6b100] rounded-lg px-3 py-1.5 text-sm font-semibold whitespace-nowrap">
            Table : {order.table?.tableNo}
          </span>
        </div>

        {/* Status */}
        <div className="ml-auto">
          {order.orderStatus === "Ready" ? (
            <span className="bg-[#2e4a40] text-green-500 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">
              <FaCheckDouble className="inline mr-2" />
              Ready
            </span>
          ) : (
            <span className="bg-[#4a452e] text-yellow-500 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">
              <FaCircle className="inline mr-2 text-xs" />
              {order.orderStatus}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrderList;