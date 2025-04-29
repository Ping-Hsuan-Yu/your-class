import { useMemo, useState } from "react";
import data from "./classInfoData.json"

type ClassInfo = {
  id: string;
  title: string;
  hours: number;
  grade: number | string;
  subject: string;
  eduStages: string;
  semester: string;
  imgSrc: string;
}

const eduStagesOptions = [
  { value: "ele", label: "國小" },
  { value: "jun-high", label: "國中" },
  { value: "exam", label: "會考總複習" },
  { value: "others", label: "能力素養" },
]

const gradeOptions = [
  { value: "1", label: "一年級" },
  { value: "2", label: "二年級" },
  { value: "3", label: "三年級" },
  { value: "4", label: "四年級" },
  { value: "5", label: "五年級" },
  { value: "6", label: "六年級" }
];

const subjectOptions = [
  { value: "CH", label: "國語" },
  { value: "EN", label: "英文" },
  { value: "MA", label: "數學" },
  { value: "NA", label: "自然" },
  { value: "SO", label: "社會" },
  { value: "MC", label: "閩南語" },
  { value: "TC", label: "科技" }
]

export default function Page() {

  const [eduStages, setEduStages] = useState(["ele", "jun-high", "exam", "others"]);
  const [grade, setGrade] = useState(["1", "2", "3", "4", "5", "6"]);
  const [subject, setSubject] = useState(["CH", "EN", "MA", "NA", "SO", "MC", "TC"]);
  const [showFilter, setShowFilter] = useState(false);

  const filteredData = useMemo(() => data.filter(item =>
    eduStages.includes(item.eduStages) &&
    grade.includes(item.grade.toString()) &&
    subject.includes(item.subject)
  ), [eduStages, grade, subject]);

  return (
    <div className="flex gap-6 max-w-7xl mx-auto relative min-h-[calc(100dvh-(var(--spacing)*20))]">
      <div className={`flex flex-col gap-4 fixed xl:sticky xl:top-30 bg-white z-20 h-full w-72 px-4 pt-4 shadow xl:w-96 xl:shadow-none xl:bg-transparent xl:pt-0 xl:mt-10 ${showFilter ? "translate-0" : "-translate-x-72"} xl:translate-none duration-300 ease-in-out`}>
        <div className="flex justify-end xl:hidden">
          <span className="material-symbols-outlined cursor-pointer" onClick={() => setShowFilter(false)}>
            close
          </span>
        </div>
        <div>
          <div className="text-xl mb-2">類別</div>
          <div className="flex gap-2 flex-wrap">
            {eduStagesOptions.map(option => (
              <FilterButton
                key={option.value}
                label={option.label}
                selected={eduStages.includes(option.value)}
                onClick={() => setEduStages(prev => prev.includes(option.value) ? prev.filter(v => v !== option.value) : [...prev, option.value])}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="text-xl mb-2">年級</div>
          <div className="flex gap-2 flex-wrap">
            {gradeOptions.map(option => (
              <FilterButton
                key={option.value}
                label={option.label}
                selected={grade.includes(option.value)}
                onClick={() => setGrade(prev => prev.includes(option.value) ? prev.filter(v => v !== option.value) : [...prev, option.value])}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="text-xl mb-2">科目</div>
          <div className="flex gap-2 flex-wrap">
            {subjectOptions.map(option => (
              <FilterButton
                key={option.value}
                label={option.label}
                selected={subject.includes(option.value)}
                onClick={() => setSubject(prev => prev.includes(option.value) ? prev.filter(v => v !== option.value) : [...prev, option.value])}
              />
            ))}
          </div>
        </div>
      </div>
      {showFilter && <div className="w-dvw h-dvh bg-grey-600 opacity-50 fixed z-10 transform xl:hidden"></div>}
      <div
        className="flex gap-2 bg-white shadow-lg rounded-full px-4 py-2 fixed top-24 left-2 z-10 cursor-pointer xl:hidden"
        onClick={() => setShowFilter(!showFilter)}
      >
        <span>篩選</span>
        <span className="material-symbols-outlined">
          tune
        </span>
      </div>
      <div className="grid grid-cols-6 gap-4 w-full mt-10">
        {filteredData.length === 0 && (
          <div className="col-span-6 text-center text-2xl font-semibold my-auto">
            您尚未購買此類別相關產品
          </div>
        )}
        {filteredData.map(classInfo => (
          <Card classInfo={classInfo} key={classInfo.id} />
        ))}
      </div>
    </div>
  );
}

function Card({ classInfo }: { classInfo: ClassInfo }) {
  const { title, hours, semester, imgSrc } = classInfo;
  return (
    <div className="bg-white shadow-lg rounded-md col-span-6 xs:col-span-3 md:col-span-2 flex flex-row xs:flex-col">
      <div className="relative w-1/2 xs:w-full">
        {semester && <div className="absolute top-2.5 left-3 px-2 py-1 rounded-sm text-sm bg-grey-600 text-white tracking-tight">{semester}</div>}
        <img src={imgSrc} alt="" />
      </div>
      <div className="p-2.5 flex flex-col gap-1 w-1/2 xs:w-full">
        <p className="xs:text-xl font-semibold">{title}</p>
        <p className="text-gray-600 text-sm">進度： {hours}%</p>
        <div className="bg-grey-400 w-full h-3 rounded-xl">
          <div className="bg-primary h-3 rounded-s-xl" style={{ width: `${hours}%` }}></div>
        </div>
        <div className="flex justify-end mt-3">
          <button className="px-3 py-1 xs:px-4 xs:py-1.5 border border-secondary text-secondary rounded-full cursor-pointer">進入</button>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      className={`px-3 py-2 border ${selected ? "border-primary text-primary" : "border-grey-400 text-grey-600"}  rounded bg-white  text-nowrap cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
