// 大学入試レベル（私学〜東大）の単語を増やす①（50語）。訳と例文はすべて自作
// band：どの単語のレベルに入るか（wordcourse.ts）。level は近い英検の級
import type { Word } from './words'
import type { CourseId } from './wordcourse'

type Up = Word & { band: CourseId }
const lv = (band: CourseId) => (band === '私学' || band === '私学難関' ? '英検2級' : band === '国公立' || band === '旧帝大' ? '英検準1級' : '英検1級')
const w = (band: CourseId, en: string, ja: string, example: string, exampleJa: string): Up => ({ id: `up-${en}`, en, ja, example, exampleJa, level: lv(band), band })

export const WORDS_UPPER: Up[] = [
  // 私学
  w('私学', 'convey', '（考え・気持ちを）伝える', 'Her smile conveyed how happy she was.', '彼女の笑顔は、どれほどうれしいかを伝えていた。'),
  w('私学', 'verify', '（正しいか）確かめる', 'Please verify your email address before you log in.', 'ログインする前にメールアドレスを確認してください。'),
  w('私学', 'trigger', '引き起こす・きっかけになる', 'A small mistake can trigger a big argument.', '小さなミスが大きな口論のきっかけになることがある。'),
  w('私学', 'yield', '（結果・利益を）生む', 'The new method yielded better results.', '新しい方法はよりよい結果を生んだ。'),
  w('私学', 'subsequent', 'その後の', 'Subsequent studies confirmed the first findings.', 'その後の研究が、最初の発見を裏づけた。'),
  w('私学', 'tangible', 'はっきりした・目に見える', 'The project has produced tangible benefits for the town.', 'その計画は町にはっきりとした利益をもたらした。'),
  w('私学', 'rigid', '（考え・規則が）かたい・厳格な', 'The school has rigid rules about uniforms.', 'その学校は制服について厳格な規則がある。'),
  w('私学', 'prevail', '広く行きわたる・勝る', 'In the end, common sense prevailed.', '最後には良識が勝った。'),
  w('私学', 'provoke', '（感情・反応を）引き起こす', 'His comment provoked laughter from the audience.', '彼の発言は観客の笑いを引き起こした。'),
  w('私学', 'substantial', '（量・大きさが）相当な・実質的な', 'Prices rose by a substantial amount last year.', '昨年、物価はかなり上がった。'),
  // 私学難関
  w('私学難関', 'sophisticated', '洗練された・高度な', 'This phone uses sophisticated technology.', 'この電話は高度な技術を使っている。'),
  w('私学難関', 'skeptical', '疑い深い・懐疑的な', 'Many scientists remain skeptical about the claim.', '多くの科学者はその主張に懐疑的なままだ。'),
  w('私学難関', 'plausible', 'もっともらしい', 'She gave a plausible excuse for being late.', '彼女は遅刻のもっともらしい言い訳をした。'),
  w('私学難関', 'undermine', '（少しずつ）弱める・損なう', 'Lack of sleep can undermine your health.', '睡眠不足は健康を少しずつ損なうことがある。'),
  w('私学難関', 'viable', '実行できる・見込みのある', 'Solar power is a viable option for this village.', '太陽光発電はこの村にとって実行できる選択肢だ。'),
  w('私学難関', 'suppress', '（感情・動きを）おさえる', 'He tried to suppress a yawn during the speech.', '彼はスピーチのあいだ、あくびをおさえようとした。'),
  w('私学難関', 'terminate', '終わらせる・打ち切る', 'The company decided to terminate the contract.', '会社はその契約を打ち切ることにした。'),
  w('私学難関', 'reconcile', '和解させる・両立させる', 'It is hard to reconcile work and family life.', '仕事と家庭生活を両立させるのはむずかしい。'),
  w('私学難関', 'utilize', '活用する', 'We should utilize the space under the stairs.', '階段の下のスペースを活用すべきだ。'),
  w('私学難関', 'trivial', 'ささいな・取るに足らない', 'They argued about a trivial matter.', '彼らはささいなことで言い争った。'),
  // 国公立
  w('国公立', 'paradox', '逆説・矛盾したこと', 'It is a paradox that more choices can make us less happy.', '選択肢が多いほど幸せでなくなりうるのは、矛盾したことだ。'),
  w('国公立', 'paradigm', '（考え方の）枠組み・模範', 'The discovery caused a paradigm shift in biology.', 'その発見は生物学の考え方の枠組みを大きく変えた。'),
  w('国公立', 'nurture', '育てる・はぐくむ', 'Good teachers nurture curiosity in their students.', 'よい先生は生徒の好奇心をはぐくむ。'),
  w('国公立', 'offset', '埋め合わせる・相殺する', 'The higher price was offset by lower fuel costs.', '高い値段は、燃料費の安さで埋め合わされた。'),
  w('国公立', 'marginal', 'わずかな・周辺的な', 'The change made only a marginal difference.', 'その変更はわずかな違いしか生まなかった。'),
  w('国公立', 'superficial', '表面的な・うわべだけの', 'His knowledge of the subject is rather superficial.', 'その分野についての彼の知識はかなり表面的だ。'),
  w('国公立', 'cognitive', '認知の・知的な', 'Reading helps children develop cognitive skills.', '読書は子どもの認知能力を伸ばすのに役立つ。'),
  w('国公立', 'resilient', '回復力のある・打たれ強い', 'Children are often more resilient than adults think.', '子どもは大人が思うよりも打たれ強いことが多い。'),
  w('国公立', 'unprecedented', '前例のない', 'The city faced an unprecedented heat wave.', 'その都市は前例のない熱波に見舞われた。'),
  w('国公立', 'volatile', '変わりやすい・不安定な', 'The price of oil has been volatile this year.', '今年、石油の価格は不安定だ。'),
  // 旧帝大
  w('旧帝大', 'perpetuate', '（悪いことを）長続きさせる', 'Old stories can perpetuate unfair ideas about people.', '古い話は、人々についての不公平な考えを長続きさせることがある。'),
  w('旧帝大', 'predominant', '主な・優勢な', 'English is the predominant language on the internet.', '英語はインターネットで主に使われる言語だ。'),
  w('旧帝大', 'scrutiny', '綿密な調査・監視', 'The new law came under close scrutiny.', '新しい法律は綿密な調査の対象になった。'),
  w('旧帝大', 'tentative', '仮の・ためらいがちな', 'We made tentative plans to meet next month.', '私たちは来月会う仮の予定を立てた。'),
  w('旧帝大', 'restrain', '（行動・感情を）抑える', 'She could hardly restrain her tears.', '彼女は涙をほとんどこらえられなかった。'),
  w('旧帝大', 'compelling', '説得力のある・強く引きつける', 'The lawyer presented compelling evidence.', '弁護士は説得力のある証拠を示した。'),
  w('旧帝大', 'contend', '主張する・争う', 'Some researchers contend that the theory is wrong.', 'その理論はまちがっていると主張する研究者もいる。'),
  w('旧帝大', 'disparity', '格差・不均衡', 'There is a large disparity between rich and poor areas.', '豊かな地域と貧しい地域のあいだには大きな格差がある。'),
  w('旧帝大', 'pragmatic', '実際的な・現実的な', 'We need a pragmatic solution, not a perfect one.', '必要なのは完璧な解決策ではなく、現実的な解決策だ。'),
  w('旧帝大', 'reciprocal', '相互の・おたがいの', 'Their friendship is based on reciprocal trust.', '彼らの友情は相互の信頼にもとづいている。'),
  // 京大
  w('京大', 'corroborate', '（証拠などで）裏づける', 'Two witnesses corroborated her story.', '2人の目撃者が彼女の話を裏づけた。'),
  w('京大', 'exemplify', '（よい）例となる・例示する', 'This building exemplifies the style of the period.', 'この建物はその時代の様式のよい例だ。'),
  w('京大', 'propensity', '（～する）傾向・性質', 'He has a propensity to exaggerate.', '彼にはおおげさに言う傾向がある。'),
  w('京大', 'preclude', '（前もって）不可能にする・さまたげる', 'Bad weather precluded any outdoor activities.', '悪天候のため、屋外での活動はいっさいできなかった。'),
  w('京大', 'salient', '目立った・顕著な', 'The report summarizes the salient points of the debate.', 'その報告書は討論の目立った論点をまとめている。'),
  // 東大
  w('東大', 'ostensibly', '表向きは', 'He left early, ostensibly to catch a train.', '彼は表向きは電車に乗るためと言って早く帰った。'),
  w('東大', 'albeit', '～ではあるが', 'The plan worked, albeit slowly.', 'その計画は、ゆっくりではあるがうまくいった。'),
  w('東大', 'nuance', '微妙な違い・ニュアンス', 'Translators must pay attention to every nuance.', '翻訳者はあらゆる微妙な違いに注意しなければならない。'),
  w('東大', 'entrench', '（考え・習慣を）定着させる', 'These habits become entrenched over many years.', 'こうした習慣は長い年月をかけて定着してしまう。'),
  w('東大', 'repercussion', '（よくない）影響・反響', 'The decision had serious repercussions for workers.', 'その決定は労働者に深刻な影響を及ぼした。'),
]
