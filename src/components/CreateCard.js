import React from "react";

import { Card } from "antd";
import CardDropdown from "./CardDropdown";

import DailySummary from "./DailySummary";
import BasicStatistic from "./statistics/BasicStatistic";
import DescriptionList from "./descriptionLists/DescriptionList";

//Fin Institutions
import AverageTPS7 from "./cards/FinInstitutions/AverageTPS7/AverageTPS7";
import IssuerApproval from "./cards/FinInstitutions/IssuerApproval/IssuerApproval";
import IssuerAuthTimes from "./cards/FinInstitutions/IssuerAuthTimes/IssuerAuthTimes";
import TopTPS31 from "./cards/FinInstitutions/TopTPS31/TopTPS31";

//Virtual Machines
import CPUutilization from "./cards/VirtualMachines/CPUutilization/CPUutilization";
import DiskUtilization from "./cards/VirtualMachines/DiskUtilization/DiskUtilization";

//Phoenix Canada
import CoreModuleStatus from "./cards/PhoenixCA/CoreModulesStatus/CoreModuleStatus";
import DailyAmountVolumes20 from "./cards/PhoenixCA/DailyAmountVolumes20/DailyAmountVolumes20";
import DailyVolumes60 from "./cards/PhoenixCA/DailyVolumes60/DailyVolumes60";
import MerchantActive from "./cards/PhoenixCA/MerchantActive/MerchantActive";
import MerchantBoarding from "./cards/PhoenixCA/MerchantBoarding/MerchantBoarding";
import TopMerchantsDeclines7 from "./cards/PhoenixCA/TopMerchantsDeclines7/TopMerchantsDeclines7";

export default function CreateCard(props) {
	const { el } = props;
	const getVendorIcon = vendorName => {
		switch (vendorName) {
			case "VISA": {
				return <i className="pf pf-visa card-icon" />;
			}
			case "MASTERCARD": {
				return <i className="pf pf-mastercard-alt card-icon" />;
			}
			case "AMEX": {
				return <i className="pf pf-american-express card-icon" />;
			}
			case "DISCOVER": {
				return <i className="pf pf-discover card-icon" />;
			}
			case "JCB": {
				return <i className="pf pf-jcb card-icon" />;
			}
			case "INTERAC": {
				return <i className="pf pf-interac card-icon" />;
			}
			default: {
				return <i className="pf pf-credit-card" />;
			}
		}
	};
	const renderSwitch = el => {
		switch (el.chartType) {
			case "2":
				return (
					<Card
						className="grid-card"
						title={
							<span>
								{getVendorIcon(el.params.fin_inst)}
								{`${el.params.node} : 
                    ${el.params.cardName}`}
							</span>
						}
						extra={<CardDropdown el={el} />}
					>
						{(() => {
							switch (el.params.size) {
								case "minimum":
									return <BasicStatistic />;
								case "normal":
									return (
										<>
											<BasicStatistic />
											<br />
										</>
									);
								case "full":
									return (
										<>
											<BasicStatistic />

											<DescriptionList />
										</>
									);
								default:
									return null;
							}
						})()}
					</Card>
				);

			case "4":
				return (
					<Card
						className="grid-card"
						title={
							<span>
								{getVendorIcon(el.params.fin_inst)}
								{`${el.params.node} : 
                    ${el.params.cardName}`}
							</span>
						}
						extra={<CardDropdown el={el} />}
					></Card>
				);
			case "daily-summary":
				return (
					<Card
						className="grid-card"
						title={
							<span>
								{
									<p>
										<b>Jobs State</b> - PHOENIX CA
									</p>
								}
							</span>
						}
						extra={<CardDropdown el={el} />}
					>
						<DailySummary />
					</Card>
				);

			case "merchant_boarding":
				return <MerchantBoarding el={el} />;

			case "daily_volumes_last_60days":
				return <DailyVolumes60 el={el} />;

			case "daily_amount_volumes_last20":
				return <DailyAmountVolumes20 el={el} />;

			case "top_merchants_declines":
				return <TopMerchantsDeclines7 el={el} />;

			case "merchant_active_inactive":
				return <MerchantActive el={el} />;

			case "issuer_auth_times":
				return <IssuerAuthTimes el={el} />;

			case "issuer_approval":
				return <IssuerApproval el={el} />;

			case "core_modules_status":
				return <CoreModuleStatus el={el} />;

			case "avg_tps_last_7_days":
				return <AverageTPS7 el={el} />;

			case "top_tps_last_31_days":
				return <TopTPS31 el={el} />;

			case "cpu_utilization":
				return <CPUutilization el={el} />;

			case "disk_util":
				return <DiskUtilization el={el} />;

			default:
				return null;
		}
	};

	return renderSwitch(el);
}
