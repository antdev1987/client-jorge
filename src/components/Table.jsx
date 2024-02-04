import { useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

export const Table = ({ columns, data, filtering, setFiltering }) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <section className="container mx-auto">
      <div className="">
        <table className="w-full border-collapse border-spacing-0">
          {/* Head */}
          <thead className="bg-slate-50">
            {table.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers?.map((header) => (
                  <th
                    key={header.id}
                    className="group table-cell cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2 justify-between pr-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                      <span className="group-hover:opacity-100 opacity-0 transition-opacity">
                        {/* <img src={sort} alt="asc-desc" /> */}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* Head */}

          {/* Body */}
          <tbody>
            {table.getRowModel().rows?.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-b-gray-300 ${row.id}`}
              >
                {row.getVisibleCells()?.map((cell) => (
                  <td key={cell.id} className={`py-3 px-3`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* Body */}
        </table>

        <footer className="flex justify-between mt-5">
          <div className="flex items-center gap-2">
            {table.getCanPreviousPage() && (
              <button
                className="btn inline-flex px-3 gap-3"
                onClick={() => table.previousPage()}
              >
                Prev Page
              </button>
            )}

            {table.getCanNextPage() && (
              <button
                className="btn inline-flex px-3 gap-3"
                onClick={() => table.nextPage()}
              >
                Next Page
              </button>
            )}
          </div>

          <form
            className="flex gap-3 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              table.setPageIndex(e.target.page.value);
            }}
          >
            <span>Página</span>

            <input
              type="number"
              name="page"
              id="page"
              min="0"
              className="inline-block rounded border w-12 py-1 text-center border-b-gray-300"
            />

            <span>de {table.getPageCount()}</span>
          </form>
        </footer>
      </div>
    </section>
  );
};
