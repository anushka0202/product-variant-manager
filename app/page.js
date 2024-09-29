import ProductTable from "@/app/components/ProductTable";
import Layout from "@/app/components/Layout";
import { Switch } from "@mui/material";

export default function Home() {
  const label = { inputProps: { "aria-label": "Switch" } };
  return (
    <Layout>
      <ProductTable />
      <div className="flex justify-between items-center mb-4 py-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-2">
            Use different design for remaining SKU's
          </h1>
          <Switch {...label} defaultChecked />
        </div>
      </div>
    </Layout>
  );
}
